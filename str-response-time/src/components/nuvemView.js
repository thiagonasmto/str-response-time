// document.addEventListener("DOMContentLoaded", function() {
//     var nuvens = document.querySelectorAll(".nuvem");
    
//     function mostrarNuvemAleatoria() {
//         // Esconde todas as nuvens
//         nuvens.forEach(function(nuvem) {
//             nuvem.style.display = "none";
//         });
        
//         // Gera um número aleatório entre 0 e o número total de nuvens
//         var indexAleatorio = Math.floor(Math.random() * nuvens.length);
        
//         // Exibe a nuvem aleatória
//         nuvens[indexAleatorio].style.display = "block";
        
//         // Define um novo tempo aleatório para a próxima exibição
//         var tempoAleatorio = Math.floor(Math.random() * 3000) + 1000; // Entre 1 e 4 segundos
//         setTimeout(mostrarNuvemAleatoria, tempoAleatorio);
//     }
    
//     // Inicia o processo de exibir nuvens aleatórias
//     mostrarNuvemAleatoria();
// });
