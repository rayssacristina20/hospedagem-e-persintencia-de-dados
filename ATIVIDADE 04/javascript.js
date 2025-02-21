const firebaseConfig = {
    apiKey: "AIzaSyBfCrCMHc...",
    authDomain: "sistema-horas-uemg.firebaseapp.com",
    projectId: "sistema-horas-uemg",
    storageBucket: "sistema-horas-uemg.appspot.com",
    messagingSenderId: "493893038347",
    appId: "1:493893038347:web:8bc9a7417106b9c7b3320e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let atividades = [];

document.addEventListener("DOMContentLoaded", async () => {
    const snapshot = await db.collection("atividades").get();
    atividades = snapshot.docs.map(doc => doc.data());
    atualizarTabela();
});

document.getElementById('atividadesForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const tipoAtividade = document.getElementById('tipoAtividade').value;
    const nomeAtividade = document.getElementById('nomeAtividade').value;
    const horasRealizadas = parseFloat(document.getElementById('horasRealizadas').value);
    
    if (!tipoAtividade || !nomeAtividade || isNaN(horasRealizadas)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const limite = limitesHoras[tipoAtividade].limite;
    const aproveitamento = limitesHoras[tipoAtividade].aproveitamento;
    let horasAproveitadas = Math.min(horasRealizadas, limite) * aproveitamento;
    
    const atividade = {
        tipo: tipoAtividade,
        nome: nomeAtividade,
        horasRealizadas,
        limite,
        aproveitamento,
        horasAproveitadas
    };

    await db.collection("atividades").add(atividade);
    
    atividades.push(atividade);
    atualizarTabela();
    
    document.getElementById('atividadesForm').reset();

    document.getElementById('resultado').innerHTML = `
        <h3>Atividade Registrada com Sucesso!</h3>
        <p><strong>Atividade:</strong> ${nomeAtividade}</p>
        <p><strong>Horas Aproveitadas:</strong> ${horasAproveitadas.toFixed(1)}</p>
    `;
});

function atualizarTabela() {
    const tbody = document.querySelector('#tabelaAtividades tbody');
    const totalHoras = document.getElementById('totalHoras');
    
    tbody.innerHTML = '';
    let somaHoras = 0;
    
    atividades.forEach(atividade => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${atividade.tipo}</td>
            <td>${atividade.nome}</td>
            <td>${atividade.horasRealizadas}</td>
            <td>${atividade.limite}</td>
            <td>${(atividade.aproveitamento * 100)}%</td>
            <td>${atividade.horasAproveitadas.toFixed(1)}</td>
        `;
        tbody.appendChild(tr);
        
        somaHoras += atividade.horasAproveitadas;
    });

    totalHoras.textContent = somaHoras.toFixed(1);
}


const limitesHoras = {
    estagio: { limite: 40, aproveitamento: 0.7 },
    projetoExtensao: { limite: 40, aproveitamento: 0.1 },
    atividadesCulturais: { limite: 5, aproveitamento: 0.8 },
    visitasTecnicas: { limite: 40, aproveitamento: 1.0 },
    visitasFeiras: { limite: 5, aproveitamento: 0.2 },
    cursosIdiomas: { limite: 20, aproveitamento: 0.6 },
    palestrasOuvinte: { limite: 10, aproveitamento: 0.8 },
    palestrasApresentador: { limite: 15, aproveitamento: 1.0 },
    empresaJunior: { limite: 20, aproveitamento: 0.2 },
    iniciacaoCientifica: { limite: 40, aproveitamento: 0.8 },
    artigoPeriodico: { limite: 10, aproveitamento: 1.0 },
    artigoCongresso: { limite: 7, aproveitamento: 1.0 },
    capituloLivro: { limite: 7, aproveitamento: 1.0 },
    resumoAnais: { limite: 5, aproveitamento: 1.0 },
    patentes: { limite: 40, aproveitamento: 1.0 }
};

document.getElementById('atividadesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tipoAtividade = document.getElementById('tipoAtividade');
    const horasRealizadas = parseFloat(document.getElementById('horasRealizadas').value);
    const nomeAtividade = document.getElementById('nomeAtividade').value;
    
    const limite = limitesHoras[tipoAtividade.value].limite;
    const aproveitamento = limitesHoras[tipoAtividade.value].aproveitamento;
    
    let horasAproveitadas = Math.min(horasRealizadas, limite) * aproveitamento;
    
    atividades.push({
        tipo: tipoAtividade.options[tipoAtividade.selectedIndex].text,
        nome: nomeAtividade,
        horasRealizadas: horasRealizadas,
        limite: limite,
        aproveitamento: aproveitamento,
        horasAproveitadas: horasAproveitadas
    });

    atualizarTabela();
    
    document.getElementById('atividadesForm').reset();
    
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'block';
    resultado.innerHTML = `
        <h3>Atividade Registrada com Sucesso!</h3>
        <p><strong>Atividade:</strong> ${nomeAtividade}</p>
        <p><strong>Horas Aproveitadas:</strong> ${horasAproveitadas.toFixed(1)}</p>
    `;
});

function atualizarTabela() {
    const tbody = document.querySelector('#tabelaAtividades tbody');
    const totalHoras = document.getElementById('totalHoras');
    
    tbody.innerHTML = '';
    
    let somaHoras = 0;
    atividades.forEach(atividade => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${atividade.tipo}</td>
            <td>${atividade.nome}</td>
            <td>${atividade.horasRealizadas}</td>
            <td>${atividade.limite}</td>
            <td>${(atividade.aproveitamento * 100)}%</td>
            <td>${atividade.horasAproveitadas.toFixed(1)}</td>
        `;
        tbody.appendChild(tr);
        
        somaHoras += atividade.horasAproveitadas;
    });
    
    totalHoras.textContent = somaHoras.toFixed(1);
} 