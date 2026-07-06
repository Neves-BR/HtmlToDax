import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const HtmlToDaxConverter = () => {
  const defaultHtml = `<div style="background: linear-gradient(135deg, #E49D29 0%, #F5C882 100%); border-radius: 12px; padding: 24px; color: #FFFFFF; text-align: center; font-family: 'Playfair Display', serif;">
  <h2 style="margin: 0 0 12px 0; font-size: 28px; font-weight: 700;">Seu Título</h2>
  <p style="margin: 0; font-size: 16px; opacity: 0.95;">Descrição do seu card visual</p>
</div>`;

  const [html, setHtml] = useState(defaultHtml);
  const [copied, setCopied] = useState(false);

  // Converte mantendo a formatação multilinhas nativa do DAX
  const convertToDax = () => {
    const converted = html.trim().replace(/"/g, "'");
    return `"${converted}"`;
  };

  const daxOutput = convertToDax();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(daxOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: '#FAF8F3',
      minHeight: '100vh',
      padding: '24px',
      fontFamily: "'Inter', sans-serif",
      boxSizing: 'border-box',
      overflowY: 'scroll',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1A1814',
            margin: '0 0 8px 0',
            fontFamily: "'Inter', sans-serif"
          }}>
            HTML → DAX Converter
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#7A746A',
            margin: '0'
          }}>
            Transforme seu HTML em DAX para Power BI Visual HTML Content
          </p>
        </div>

        {/* Container Principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
          alignItems: 'start'
        }}>
          
          {/* Painel Esquerdo: Editor */}
          <div style={{
            background: '#F0EDE6',
            border: '0.5px solid #D4CFC4',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            height: '480px',
            boxSizing: 'border-box'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1A1814',
              marginBottom: '12px',
              display: 'block',
              flexShrink: 0
            }}>
              Seu HTML / CSS
            </label>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              style={{
                width: '100%',
                flex: '1 1 0%',
                minHeight: 0,
                padding: '12px',
                border: '0.5px solid #D4CFC4',
                borderRadius: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                lineHeight: '1.6',
                color: '#1A1814',
                backgroundColor: '#FFFFFF',
                resize: 'none',
                overflowY: 'scroll',
                boxSizing: 'border-box'
              }}
              placeholder="Cole seu HTML aqui..."
            />
            <button
              onClick={() => setHtml(defaultHtml)}
              style={{
                marginTop: '12px',
                height: '38px',
                minHeight: '38px',
                maxHeight: '38px',
                padding: '0 16px',
                background: 'transparent',
                border: '0.5px solid #D4CFC4',
                borderRadius: '6px',
                color: '#7A746A',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                flexShrink: 0,
                boxSizing: 'border-box'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#E0D9CC';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              {/* CORREÇÃO CRÍTICA: Travando width e height absolutos para impedir expansão */}
              <RefreshCw 
                size={14} 
                style={{ 
                  flexShrink: 0, 
                  width: '14px', 
                  height: '14px', 
                  minWidth: '14px', 
                  minHeight: '14px', 
                  maxWidth: '14px', 
                  maxHeight: '14px' 
                }} 
              /> 
              <span>Resetar para exemplo</span>
            </button>
          </div>

          {/* Painel Direito: Preview + DAX */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '480px',
            boxSizing: 'border-box'
          }}>
            
            {/* Preview (Sandbox Fixa) */}
            <div style={{
              background: '#F0EDE6',
              border: '0.5px solid #D4CFC4',
              borderRadius: '12px',
              padding: '20px',
              height: '228px',
              minHeight: '228px',
              maxHeight: '228px',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              flexShrink: 0
            }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1A1814',
                marginBottom: '12px',
                display: 'block',
                flexShrink: 0
              }}>
                Preview
              </label>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '8px',
                  padding: '16px',
                  flex: '1 1 0%',
                  minHeight: 0,
                  overflow: 'auto',
                  position: 'relative',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* CORREÇÃO CRÍTICA: 'contain: content' isola o HTML/SVG colado e impede que interfira na página */}
                <div 
                  style={{ 
                    width: '100%', 
                    maxHeight: '100%', 
                    overflow: 'auto',
                    display: 'block',
                    contain: 'content' 
                  }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>

            {/* DAX Output - Multilinhas */}
            <div style={{
              background: '#F0EDE6',
              border: '0.5px solid #D4CFC4',
              borderRadius: '12px',
              padding: '20px',
              height: '228px',
              minHeight: '228px',
              maxHeight: '228px',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              flexShrink: 0
            }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1A1814',
                marginBottom: '12px',
                display: 'block',
                flexShrink: 0
              }}>
                Código DAX (formatado e pronto para colar)
              </label>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '8px',
                  padding: '12px',
                  flex: '1 1 0%',
                  minHeight: 0,
                  overflowY: 'scroll',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#1A1814',
                  lineHeight: '1.6',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  boxSizing: 'border-box'
                }}
              >
                {daxOutput}
              </div>
              <button
                onClick={copyToClipboard}
                style={{
                  marginTop: '12px',
                  height: '38px',
                  minHeight: '38px',
                  maxHeight: '38px',
                  padding: '0 16px',
                  background: '#E49D29',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  boxSizing: 'border-box'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#D08A1A';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#E49D29';
                }}
              >
                {/* CORREÇÃO CRÍTICA: Travando width e height absolutos para impedir expansão */}
                <Copy 
                  size={14} 
                  style={{ 
                    flexShrink: 0, 
                    width: '14px', 
                    height: '14px', 
                    minWidth: '14px', 
                    minHeight: '14px', 
                    maxWidth: '14px', 
                    maxHeight: '14px' 
                  }} 
                />
                <span>{copied ? 'Copiado!' : 'Copiar DAX'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div style={{
          background: '#F0EDE6',
          border: '0.5px solid #D4CFC4',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#1A1814',
            margin: '0 0 8px 0'
          }}>
            📋 Como usar no Power BI:
          </h3>
          <ol style={{
            fontSize: '13px',
            color: '#7A746A',
            margin: '0',
            paddingLeft: '20px',
            lineHeight: '1.8'
          }}>
            <li>Cole seu HTML no painel esquerdo.</li>
            <li>Clique em "Copiar DAX" para copiar o bloco formatado.</li>
            <li>No Power BI, crie uma nova medida e cole diretamente após o sinal de igual (`=`):</li>
          </ol>
          <div style={{
            background: '#FFFFFF',
            border: '0.5px solid #D4CFC4',
            borderRadius: '6px',
            padding: '8px 12px',
            marginTop: '8px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#1A1814',
            overflowX: 'auto',
            lineHeight: '1.6',
            whiteSpace: 'pre'
          }}>
{`MinhaMedidaHTML = 
"<div style='background: ...'>
  <h2>Seu Título</h2>
</div>"`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlToDaxConverter;
