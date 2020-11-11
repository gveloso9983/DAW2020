<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/" >
        <xsl:for-each select="//ARQELEM">
            <xsl:result-document href="pages/arq{count(preceding-sibling::*)+1}.html">
                <xsl:copy-of select="."/>
            </xsl:result-document>
        </xsl:for-each>
    </xsl:template>
    
</xsl:stylesheet>