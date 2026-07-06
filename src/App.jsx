import React, { useState, useRef } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const HtmlToDaxConverter = () => {
  const defaultHtml = `<div style="background: linear-gradient(135deg, #E49D29 0%, #F5C882 100%); border-radius: 12px; padding: 24px; color: #FFFFFF; text-align: center; font-family: 'Playfair Display', serif;">
  <h2 style="margin: 0 0 12px 0; font-size: 28px; font-weight: 700;">Seu Título</h2>
  <p style="margin: 0; font-size: 16px; opacity: 0.95;">Descrição do seu card visual</p>
</div>`;

  const [html, setHtml] = useState(defaultHtml);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef(null);

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
      fontFamily: "'Inter', sans-serif"
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
          gridTemplateColumns: 'repeat(3, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Painel Esquerdo: Editor */}
          <div style={{
            background: '#F0EDE6',
            border: '0.5px solid #D4CFC4',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1A1814',
              marginBottom: '12px',
              display: 'block'
            }}>
              Seu HTML / CSS
            </label>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              style={{
                flex: 1,
                padding: '12px',
                border: '0.5px solid #D4CFC4',
                borderRadius: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                lineHeight: '1.6',
                color: '#1A1814',
                backgroundColor: '#FFFFFF',
                resize: 'vertical',
                minHeight: '400px'
              }}
              placeholder="Cole seu HTML aqui..."
            />
            <button
              onClick={() => setHtml(defaultHtml)}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
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
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#E0D9CC';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <RefreshCw size={14} /> Resetar para exemplo
            </button>
          </div>

          {/* Painel Direito: Preview + DAX */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* Preview */}
            <div style={{
              background: '#F0EDE6',
              border: '0.5px solid #D4CFC4',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1A1814',
                marginBottom: '12px',
                display: 'block'
              }}>
                Preview
              </label>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '8px',
                  padding: '16px',
                  minHeight: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>

            {/* DAX Output - Multilinhas */}
            <div style={{
              background: '#F0EDE6',
              border: '0.5px solid #D4CFC4',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1A1814',
                marginBottom: '12px',
                display: 'block'
              }}>
                Código DAX (formatado e pronto para colar)
              </label>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '8px',
                  padding: '12px',
                  maxHeight: '320px',
                  overflowY: 'auto',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#1A1814',
                  lineHeight: '1.6',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {daxOutput}
              </div>
              <button
                onClick={copyToClipboard}
                style={{
                  marginTop: '12px',
                  padding: '10px 16px',
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
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#D08A1A';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#E49D29';
                }}
              >
                <Copy size={14} />
                {copied ? 'Copiado!' : 'Copiar DAX'}
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
          marginBottom: '20px'
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
            overflow: 'auto',
            lineHeight: '1.6',
            whiteSpace: 'pre'
          }}>
{`MinhaMedidaHTML = 
"<div style='background: ...'>
  <h2>Seu Título</h2>
</div>"`}
          </div>
          <p style={{
            fontSize: '12px',
            color: '#7A746A',
            margin: '8px 0 0 0'
          }}>
            ✅ <strong>Formato Multilinhas:</strong> O DAX interpreta perfeitamente quebras de linha dentro de strings. Mantemos a legibilidade visual da sua estrutura original trocando apenas as aspas para evitar erros de sintaxe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HtmlToDaxConverter;
