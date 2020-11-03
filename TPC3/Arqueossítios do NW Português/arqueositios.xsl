<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
             <title>Arqueositios do Noroeste Portuges</title>
             <body>
                 <h2>Arqueositios do Noroeste Portuges</h2>
                 <h3>Índice dos Arqueositios do Noroeste</h3>
                 <ol>
                     <xsl:apply-templates select="//ARQELEM" mode="indice">
                         <xsl:sort select="IDENTI"/>
                     </xsl:apply-templates>
                 </ol>
             </body>
            </html>
            <xsl:apply-templates/>
        </xsl:result-document>
         
        
    </xsl:template>
    
    <!-- Templates de índice ................................... -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Template para conteudo -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <body>
                <p><b>Nome :</b> <xsl:value-of select="IDENTI"/></p>
                <p><b>Lugar :</b> <xsl:value-of select="LUGAR"/></p>
                <p><b>Freguesia :</b> <xsl:value-of select="FREGUE"/></p>
                <p><b>Concelho:</b> <xsl:value-of select="CONCEL"/></p>
                <p><b>Acesso :</b><xsl:value-of select="ACESSO"/></p> 
                <p><b>Quadro :</b> <xsl:value-of select="QUADRO"/></p>      
                <p><b>Descricao :</b> <xsl:value-of select="DESARQ"/></p>         
                <address>
                    [<a href="index.html#i{generate-id()}">Voltar a Homepage</a>]
                </address> 
            </body>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>