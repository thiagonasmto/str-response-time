import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AbaOld.css';
import nuvem1 from '../img/nuvem.svg';
import nuvem2 from '../img/nuvem (1).svg';
import nuvem3 from '../img/nuvem (2).svg';
import nuvem4 from '../img/nuvem (3).svg';

const Aba = (props) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const { className, visibilidadeM, visibilidadeGame } = props;
    const [currentImage, setCurrentImage] = useState(null);
    const [correctKey, setCorrectKey] = useState(null);
    const [imageTime, setImageTime] = useState(null);
    const [responseTime, setResponseTime] = useState(null);
    const [listening, setListening] = useState(false);
    const [lastImage, setLastImage] = useState(null);

    const getRandomPosition = () => {
        // Gere valores aleatórios para as posições top e left
        const randomTop = Math.floor(Math.random() * 90) + 5; // Valores entre 5% e 95%
        const randomLeft = Math.floor(Math.random() * 90) + 5; // Valores entre 5% e 95%

        return {
            top: `${randomTop}%`,
            left: `${randomLeft}%`
        };
    };

    const handleOkClick = () => {
        setIsVisible(false); // Atualiza o estado para ocultar o componente Aba
        navigate('/vgame'); // Navega para a rota do componente Vgame
    };

    // Mapeamento entre as imagens e as teclas associadas
    const imageKeyMap = {
        [nuvem1]: 'w',
        [nuvem2]: 'a',
        [nuvem3]: 's',
        [nuvem4]: 'd',
    };

    useEffect(() => {
        // Função para calcular um intervalo de tempo aleatório entre 2 e 6 segundos
        const randomInterval = () => {
            return Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000; // Retorna um número aleatório entre 2000 e 6000
        };

        // Função para exibir uma imagem aleatória
        const showRandomImage = () => {
            const images = [nuvem1, nuvem2, nuvem3, nuvem4]; // Adicione aqui suas outras imagens
            const newImage = images[Math.floor(Math.random() * images.length)];

            // Verifica se a nova imagem é diferente da última
            if (newImage !== lastImage) {
                setCurrentImage(newImage);
                setImageTime(new Date()); // Salva o tempo em que a imagem apareceu
                setCorrectKey(null); // Limpa a tecla correta
                setLastImage(newImage); // Define a última imagem mostrada
                setListening(true);
            } else {
                // Se a nova imagem for igual à última, chama a função novamente para tentar obter uma nova imagem
                showRandomImage();
            }
        };

        // Exiba uma imagem aleatória quando o componente montar
        showRandomImage();

        // Defina um intervalo para exibir imagens aleatórias em um intervalo de tempo entre 2 e 6 segundos
        const interval = setInterval(() => {
            showRandomImage();
        }, randomInterval());

        // Limpe o intervalo quando o componente desmontar para evitar vazamento de memória
        return () => clearInterval(interval);
    }, []);



    useEffect(() => {
        const handleKeyDown = (event) => {
            const keyPressed = event.key.toLowerCase();
            // Verifique se a tecla pressionada corresponde a alguma das teclas mapeadas
            if (Object.values(imageKeyMap).includes(keyPressed) && correctKey === null) {
                // Obtenha a imagem associada à tecla pressionada
                const image = Object.keys(imageKeyMap).find(key => imageKeyMap[key] === keyPressed);
                if (image && image === currentImage) {
                    console.log(`Tecla pressionada: ${keyPressed}, Imagem associada: ${image}`);
                    console.log('Resposta correta!');
                    setCorrectKey(keyPressed);
                    const timeDifference = (new Date() - imageTime) / 1000; // Calcula o tempo de resposta em segundos
                    setResponseTime(timeDifference);
                    console.log(`Tempo de resposta: ${timeDifference} segundos`);
                    setListening(false);
                }
            }
        };

        // Adiciona ou remove o evento de escuta de tecla com base na imagem atual
        if (listening) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentImage, correctKey, imageTime, listening]);

    return (
        <div className={`aba ${className} ${isVisible ? '' : 'hidden'}`}>
            <div className="cabecalho">
                <div className="titulo">
                    <h1 className="poppins-light">RESPONSETIME.EXE</h1>
                </div>
                <div className="botoes">
                    <button className="buttonB" type="button">_</button>
                    <button className="buttonB" type="button">_</button>
                    <button className="buttonB" type="button">X</button>
                </div>
            </div>
            <div className="separador"></div>
            {visibilidadeM && (
                <div className="mensagem">
                    <p className="poppins-regular">Teste o seu tempo de resposta!</p>
                    <div className="decisao">
                        <div className="bOC">
                            <button className="buttonD" type="button" onClick={handleOkClick}>Ok</button>                        </div>
                        <div className="bOC">
                            <button className="buttonD" type="button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {visibilidadeGame && (
                <div className="container-viewGame">
                    <div className="viewGame">
                        {currentImage && <img
                            src={currentImage}
                            className="nuvem"
                            alt="Nuvem"
                            style={{
                                position: 'absolute',
                                ...getRandomPosition(),
                            }}
                        />}
                        {correctKey && <p>Resposta correta! Tecla pressionada: {correctKey}, Tempo de resposta: {responseTime} segundos</p>}
                    </div>
                    <div className="controles">
                        <div className="teclas">
                            <button type="button">W</button>
                            <button type="button">A</button>
                            <button type="button">S</button>
                            <button type="button">D</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Aba;
