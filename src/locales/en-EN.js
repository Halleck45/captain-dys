export default {
    "name": "🇬🇧 English",
    "toolbar": {
        "bold": "Bold",
        "italic": "Itac",
        "underline": "Underline",
        "strike": "Strike",
        "list": "List",
    },
    "layout": {
        "speak": "Speak to editor",
        "listen": "Listen",
        "syllabes": "Syllabes",
        "print": "Print",
        "colors": "Colors",
        "bionic": "Bionic reading",
        "share": "Share",
        "help": "Help",
        "contribute": "Contribute",
        "upload": "Import picture",
        "crop": "Crop",
        "cancel": "Cancel",
    },
    "help": {
        "title": "How does it work?",
        "close": "Close",
        "intro": "Captain Dys helps children with dyslexia read and write more easily. Here is what the buttons do:",
        "items": [
            {"label": "Colors", "text": "Highlights letter groups (digraphs), silent letters and 'bossy r' sounds so tricky spellings are easier to read."},
            {"label": "Bionic reading", "text": "Puts the first part of each word in bold to give the eye fixation points and guide reading."},
            {"label": "Import picture", "text": "Take or choose a photo of a text and turn it into editable text."},
            {"label": "Listen / Speak", "text": "Read the text out loud, or dictate text with your voice."},
            {"label": "Share", "text": "Send the current text to someone (the text is kept in the link)."},
        ]
    },
    "editor": {
        "welcome": "Hello! Write or paste your text here.",
        //
        // English phonics colour code. Contributions welcome! :)
        //
        // Order matters: patterns are applied top-to-bottom and a later
        // pattern re-colours any letters an earlier one already coloured.
        // So shorter/general patterns come first, longer/more specific ones
        // (trigraphs, r-controlled teams, silent-e) come after to win overlaps.
        //
        // Colour legend:
        //   #CCC    silent / redundant letters
        //   #3B82F6 consonant digraphs (sh, ch, ...)
        //   #8B5CF6 th
        //   #10B981 ng
        //   #059669 long vowel teams (ee, ea, ai, ...)
        //   #D97706 / #F59E0B rounded vowel teams (oo, ou, oa, ...)
        //   #60A5FA oi / oy
        //   #DB2777 igh
        //   #DC2626 r-controlled vowels ("bossy r")
        //   #A78BFA -tion / -sion endings
        //
        "colors": [

            // --- silent / redundant letters ---
            {regex: "\\b(k)n", color: '#CCC'},   // silent k: know, knee
            {regex: "\\b(w)r", color: '#CCC'},   // silent w: write, wrong
            {regex: "\\b(g)n", color: '#CCC'},   // silent g: gnome
            {regex: "m(b)\\b", color: '#CCC'},   // silent b: comb, thumb, lamb
            {regex: "gh", color: '#CCC'},        // often silent: light, though
            {regex: "(?:c)(k)", color: '#CCC'},  // ck = /k/, drop one letter

            // --- double consonants (only one is sounded) ---
            {regex: "(?:l)(l)", color: '#CCC'},
            {regex: "(?:s)(s)", color: '#CCC'},
            {regex: "(?:t)(t)", color: '#CCC'},
            {regex: "(?:f)(f)", color: '#CCC'},
            {regex: "(?:m)(m)", color: '#CCC'},
            {regex: "(?:n)(n)", color: '#CCC'},
            {regex: "(?:p)(p)", color: '#CCC'},
            {regex: "(?:r)(r)", color: '#CCC'},
            {regex: "(?:d)(d)", color: '#CCC'},
            {regex: "(?:g)(g)", color: '#CCC'},
            {regex: "(?:b)(b)", color: '#CCC'},
            {regex: "(?:z)(z)", color: '#CCC'},

            // --- consonant digraphs & trigraphs ---
            {regex: "sh", color: '#3B82F6'},
            {regex: "ch", color: '#3B82F6'},
            {regex: "tch", color: '#3B82F6'}, // after "ch" so "match" -> whole "tch"
            {regex: "th", color: '#8B5CF6'},
            {regex: "ph", color: '#3B82F6'},
            {regex: "wh", color: '#3B82F6'},
            {regex: "ng", color: '#10B981'},
            {regex: "dge", color: '#3B82F6'}, // /j/: bridge, edge

            // --- vowel teams ---
            {regex: "ee", color: '#059669'},
            {regex: "ea", color: '#059669'},
            {regex: "ai", color: '#059669'},
            {regex: "ay", color: '#059669'},
            {regex: "ey", color: '#059669'},
            {regex: "ie", color: '#059669'},
            {regex: "igh", color: '#DB2777'}, // after "ie"/"gh" so "light" -> whole "igh"
            {regex: "oa", color: '#F59E0B'},
            {regex: "oe", color: '#F59E0B'},
            {regex: "oo", color: '#D97706'},
            {regex: "ou", color: '#D97706'},
            {regex: "ow", color: '#D97706'},
            {regex: "au", color: '#D97706'},
            {regex: "aw", color: '#D97706'},
            {regex: "ew", color: '#D97706'},
            {regex: "ue", color: '#D97706'},
            {regex: "oi", color: '#60A5FA'},
            {regex: "oy", color: '#60A5FA'},

            // --- r-controlled vowels ("bossy r") ---
            // 2-letter first, then longer teams so they win the overlap
            {regex: "ar", color: '#DC2626'},
            {regex: "er", color: '#DC2626'},
            {regex: "ir", color: '#DC2626'},
            {regex: "or", color: '#DC2626'},
            {regex: "ur", color: '#DC2626'},
            {regex: "air", color: '#DC2626'},
            {regex: "ear", color: '#DC2626'},
            {regex: "eer", color: '#DC2626'},
            {regex: "oor", color: '#DC2626'},
            {regex: "our", color: '#DC2626'},

            // --- common endings ---
            {regex: "tion", color: '#A78BFA'}, // /shun/: station, action
            {regex: "sion", color: '#A78BFA'}, // /zhun/ or /shun/: vision

            // --- silent "magic e" (long-vowel marker) ---
            // final e after a vowel-consonant pattern: cake, time, bone, these
            {regex: "(?<=[aeiouy][b-df-hj-np-tv-z])e\\b", color: '#CCC'},
        ]
    }
}
