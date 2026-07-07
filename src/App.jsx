import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const HtmlToDaxConverter = () => {
  const defaultHtml = `<div style="background: linear-gradient(135deg, #E49D29 0%, #F5C882 100%); border-radius: 12px; padding: 24px; color: #FFFFFF; text-align: center; font-family: 'Playfair Display', serif;">
  <h2 style="margin: 0 0 12px 0; font-size: 28px; font-weight: 700;">Seu Título</h2>
  <p style="margin: 0; font-size: 16px; opacity: 0.95;">Descrição do seu card visual</p>
</div>`;

  const [html, setHtml] = useState(defaultHtml);
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Hook para detectar responsividade
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const containerRef = useRef(null);
  const contentRef = useRef(null);

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

  // Cálculo de Escala Baseado em Canvas Virtual Fixo (Resolve o efeito de zoom intermitente)
  // Cálculo de Escala Baseado em Canvas Virtual Fixo (Resolve o efeito de zoom intermitente)
  useLayoutEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const updateScale = () => {
      const container = containerRef.current;

      // Resolução virtual padrão em 16:9
      const VIRTUAL_WIDTH = 800;
      const VIRTUAL_HEIGHT = 450;

      const availableWidth = container.clientWidth;
      const availableHeight = container.clientHeight;

      // Calculamos a escala APENAS pelas dimensões virtuais fixas.
      // Isso impede que alterações internas do HTML afetem o zoom.
      const scaleX = availableWidth / VIRTUAL_WIDTH;
      const scaleY = availableHeight / VIRTUAL_HEIGHT;

      const padding = 0.96;

      // Mantemos a margem de segurança e bloqueamos ampliações desnecessárias
      const newScale = Math.min(
        1,
        scaleX * padding,
        scaleY * padding
      );

      setScale(newScale);
    };

    // Executa a primeira vez para ajustar a escala
    updateScale();

    // Utiliza o ResizeObserver para manter a responsividade perfeita 
    // sem depender do state do HTML ou de breakpoints específicos.
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []); // Sem a dependência de 'html', o zoom fica totalmente estável ao digitar!
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
        maxWidth: '1500px',
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
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '24px',
          alignItems: 'stretch',
          height: isMobile ? 'auto' : 'calc(100vh - 210px)',
          minHeight: '620px',
          marginBottom: '24px'
        }}>
          
          {/* Coluna Esquerda: Editores */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            minHeight: 0
          }}>
            
            {/* Card 1: Seu HTML */}
            <div style={{
              background: '#F0EDE6',
              border: '0.5px solid #D4CFC4',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
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
                  flex: 1,
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
                  overflowY: 'auto',
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
                onMouseOver={(e) => e.target.style.background = '#E0D9CC'}
                onMouseOut={(e) => e.target.style.background = 'transparent'}
              >
                <RefreshCw size={14} style={{ flexShrink: 0 }} /> 
                <span>Resetar para exemplo</span>
              </button>
            </div>

            {/* Card 2: DAX Output */}
            <div style={{
              background: '#F0EDE6',
              border: '0.5px solid #D4CFC4',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
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
                Código DAX (formatado e pronto para colar)
              </label>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '8px',
                  padding: '12px',
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
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
                onMouseOver={(e) => e.target.style.background = '#D08A1A'}
                onMouseOut={(e) => e.target.style.background = '#E49D29'}
              >
                <Copy size={14} style={{ flexShrink: 0 }} />
                <span>{copied ? 'Copiado!' : 'Copiar DAX'}</span>
              </button>
            </div>

          </div>

          {/* Coluna Direita: Preview Unificado */}
          <div style={{
            background: '#F0EDE6',
            border: '0.5px solid #D4CFC4',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            minHeight: 0
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1A1814',
              marginBottom: '12px',
              display: 'block',
              flexShrink: 0
            }}>
              Preview (16:9 Fit to View)
            </label>
            
            <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 0,
              width: '100%'
            }}>
              {/* Moldura física do Canvas 16:9 */}
              <div
                ref={containerRef}
                style={{
                  aspectRatio: '16 / 9',
                  width: '100%',
                  maxHeight: '100%',
                  background: '#FFFFFF',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '8px',
                  position: 'relative', // Essencial para ancorar o posicionamento absoluto do filho
                  overflow: 'hidden', 
                  boxSizing: 'border-box'
                }}
              >
                {/* O Canvas Virtual estático de 800x450 */}
                <div 
                  ref={contentRef}
                  style={{ 
                    width: '800px',
                    height: '450px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transformOrigin: 'center center',
                    boxSizing: 'border-box'
                  }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
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
};

export default HtmlToDaxConverter;
