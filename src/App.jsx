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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Monitorar redimensionamento para responsividade
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useLayoutEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    content.style.transform = 'none';

    const contentWidth = content.scrollWidth || 1;
    const contentHeight = content.scrollHeight || 1;
    
    const availableWidth = container.clientWidth - 32;
    const availableHeight = container.clientHeight - 32;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;

    const padding = 0.96;
    const newScale = Math.min(1, scaleX * padding, scaleY * padding);

    setScale(newScale);
  }, [html]);

  const isMobile = windowWidth < 1000;

  return (
    <div style={{
      background: '#FAF8F3',
      minHeight: '100vh',
      padding: '24px',
      fontFamily: "'Inter', sans-serif",
      boxSizing: 'border-box',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1500px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1A1814', margin: '0 0 8px 0' }}>
            HTML → DAX Converter
          </h1>
          <p style={{ fontSize: '16px', color: '#7A746A', margin: '0' }}>
            Transforme seu HTML em DAX para Power BI Visual HTML Content
          </p>
        </div>

        {/* Container Principal Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '24px',
          alignItems: 'stretch',
          marginBottom: '24px',
          height: isMobile ? 'auto' : 'calc(100vh - 210px)',
          minHeight: isMobile ? 'auto' : '620px'
        }}>
          
          {/* Coluna Esquerda: Editores (Empilhados) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '100%'
          }}>
            {/* Card 1: HTML */}
            <div style={{
              background: '#F0EDE6',
              border: '0.5px solid #D4CFC4',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              boxSizing: 'border-box'
            }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#1A1814', marginBottom: '12px' }}>
                Seu HTML / CSS
              </label>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                style={{
                  width: '100%',
                  flex: 1,
                  padding: '12px',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '8px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: '#1A1814',
                  backgroundColor: '#FFFFFF',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={() => setHtml(defaultHtml)}
                style={{
                  marginTop: '12px',
                  height: '38px',
                  background: 'transparent',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '6px',
                  color: '#7A746A',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <RefreshCw size={14} /> <span>Resetar para exemplo</span>
              </button>
            </div>

            {/* Card 2: DAX */}
            <div style={{
              background: '#F0EDE6',
              border: '0.5px solid #D4CFC4',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              boxSizing: 'border-box'
            }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#1A1814', marginBottom: '12px' }}>
                Código DAX (formatado e pronto para colar)
              </label>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid #D4CFC4',
                  borderRadius: '8px',
                  padding: '12px',
                  flex: 1,
                  overflowY: 'auto',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#1A1814',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
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
                  background: '#E49D29',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Copy size={14} /> <span>{copied ? 'Copiado!' : 'Copiar DAX'}</span>
              </button>
            </div>
          </div>

          {/* Coluna Direita: Preview */}
          <div style={{
            background: '#F0EDE6',
            border: '0.5px solid #D4CFC4',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#1A1814', marginBottom: '12px' }}>
              Preview
            </label>
            <div
              ref={containerRef}
              style={{
                background: '#FFFFFF',
                border: '0.5px solid #D4CFC4',
                borderRadius: '8px',
                padding: '16px',
                flex: 1,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div 
                ref={contentRef}
                style={{ 
                  display: 'inline-block',
                  maxWidth: '100%',
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.15s ease-out'
                }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div style={{
          background: '#F0EDE6',
          border: '0.5px solid #D4CFC4',
          borderRadius: '12px',
          padding: '16px',
          boxSizing: 'border-box'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#1A1814', margin: '0 0 8px 0' }}>
            📋 Como usar no Power BI:
          </h3>
          <ol style={{ fontSize: '13px', color: '#7A746A', margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Cole seu HTML no painel esquerdo.</li>
            <li>Clique em "Copiar DAX" para copiar o bloco formatado.</li>
            <li>No Power BI, crie uma nova medida e cole diretamente após o sinal de igual (=).</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HtmlToDaxConverter;
