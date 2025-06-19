import React, { useState } from "react";
import "./App.css";

function App() {
  const [valorInvestido, setValorInvestido] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [taxa, setTaxa] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const investimento = parseFloat(valorInvestido);
    const compra = parseFloat(precoCompra);
    const venda = parseFloat(precoVenda);
    const taxaPercentual = parseFloat(taxa) || 0;

    if (!investimento || !compra || !venda) {
      setResultado('Preencha todos os campos obrigatórios.');
      return;
    }

    const btcComprado = investimento / compra;
    const valorFinal = btcComprado * venda;
    const totalComTaxa = investimento * (1 + taxaPercentual / 100);
    const lucro = valorFinal - totalComTaxa;
    const percentual = (lucro / totalComTaxa) * 100;

    setResultado({
      btcComprado: btcComprado.toFixed(6),
      valorFinal: valorFinal.toFixed(2),
      totalComTaxa: totalComTaxa.toFixed(2),
      lucro: lucro.toFixed(2),
      percentual: percentual.toFixed(2)
    });
  };

  return (
    <div className='container'>
      <h2>💰 Simulador de Lucro em Bitcoin</h2>

      <label>Valor investido (R$):</label>
      <input
        type='number'
        value={valorInvestido}
        onChange={(e) => setValorInvestido(e.target.value)}
      />

      <label>Preço de compra do BTC (R$):</label>
      <input
        type='number'
        value={precoCompra}
        onChange={(e) => setPrecoCompra(e.target.value)}
      />

      <label>Preço de venda do BTC (R$):</label>
      <input
        type='number'
        value={precoVenda}
        onChange={(e) => setPrecoVenda(e.target.value)}
      />

      <label>Taxa total (%):</label>
      <input
        type='number'
        value={taxa}
        onChange={(e) => setTaxa(e.target.value)}
      />

      <button onClick={calcular}>Calcular</button>
      {resultado && (
        <div className='resultado'>
          {typeof resultado === 'string' ? (
            <p>{resultado}</p>
          ) : (
            <div>
              <p>📉 BTC comprado: {resultado.btcComprado}</p>
              <p>💸 Valor final: R$ {resultado.valorFinal}</p>
              <p>🔧 Total investido com taxa: R$ {resultado.totalComTaxa}</p>
              <p>✅ Lucro: R$ {resultado.lucro}</p>
              <p>📊 Percentual: {resultado.percentual}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
