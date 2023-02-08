export default {
    "name": "🇫🇷 Français",
    "toolbar": {
        "bold": "Gras",
        "italic": "Italique",
        "underline": "Souligné",
        "strike": "Barré",
        "list": "Liste",
    },
    "layout": {
        "speak": "Parler à l'éditeur",
        "listen": "Écouter",
        "syllabes": "Syllabes",
        "print": "Imprimer",
        "colors": "Couleurs",
        "spelling": "Souligner les fautes",
        "contribute": "Aider le projet",
        "upload": "Importer une photo",
    },
    "editor": {
        "welcome": "Bonjour ! Écris ou colle ton texte ici.",
        "colors": [
            // muet
            {regex: "(t)['-\\s+\\.,;\!\?]", color: '#CCC'}, // end t
            {regex: "(?:[nm])([nm])", color: '#CCC'}, // double n/m
            {regex: "(?:p)(p)", color: '#CCC'}, // double n/m
            {regex: "(?:l)(l)", color: '#CCC'}, // double ll
            {regex: "(?:(?<!ou))(s)['-\\s+\\.,;\!\?]", color: '#CCC'}, // end s

            // sounds
            {regex: "(a[nm])(?![aéèêëeiyounm])", color: '#60A5FA'}, // an not followed by vowel or n/m
            {regex: "(e[nm])(?![aéèêëeiyounm])", color: '#60A5FA'}, // en not followed by vowel or n/m
            {regex: "(ai)(?:(?![nm])|([nm][aeiyou]))", color: '#059669'}, // ai not followed by n,m, or followed by n,m but without vowel after
            {regex: "(ai[nm]?)(?![aéèêëeiyou])", color: '#DB2777'}, // ain / aim not followed by vowel
            {regex: "(ou)", color: '#D97706'}, // ou
            {regex: "(oi)", color: '#60A5FA'}, // ou
            {regex: "(ion)[\\s+\\.,;\!\?]", color: '#A78BFA'}, // ion
            {regex: "(gn)", color: '#3B82F6'}, // gn
            {regex: "(?:(?<!i))(on)", color: '#10B981'}, // on not previoused by vowel
            {regex: "ch", color: '#3B82F6'}, // ch
            {regex: "eu", color: '#3B82F6'}, // eu
            {regex: "(?:q)(u)", color: '#CCC'}, // qu (fix bug)
            {regex: "(?:g)(u)", color: '#CCC'}, // qu (fix bug)
            {regex: "(un)(?![aéèêëeiyounm])", color: '#F59E0B'}, // un not followed by vowel
            {regex: "(un[aeiyounm])", color: '#10B981'}, // un +  vowel
            {regex: "(œu)", color: '#F59E0B'}, //œu
            {regex: "(ien)['-\\s+\\.,;\!\?]", color: '#F59E0B'}, // ien

            // tool words
            {regex: "['-\\s+\\.,;\!\?](et|est)['-\\s+\\.,;\!\?]", color: '#A78BFA'}, // et
            {regex: "['-\\s+\\.,;\!\?](où)['-\\s+\\.,;\!\?]+", color: '#A78BFA'}, // où
        ]
    }
}