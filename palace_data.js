// Mapping Neurodiversity - Master Data Base v3.1.3
// Credit: Savannah Denny (Colour Me Neurospicy) for the 20-parameter model.
// Tonalität: Neuroaffirmativ, einfühlsam und wissenschaftlich fundiert.

const palaceData = [
  {
    id: 1,
    nameEN: "Sensory Overload",
    nameDE: "Akute Reizüberflutung",
    definition: "Der Zustand, in dem das sensorische Nervensystem mehr Inputs erhält, als es filtern, verarbeiten und abbauen kann.",
    scenario: "Du stehst mitten in einer überfüllten Mensa. Die Teller klappern, Stimmen hallen laut wider, Neonröhren surren und der Geruch von Essen liegt schwer in der Luft.",
    deepDive: "Beim sensorischen Overload versagt der Thalamus – das 'Tor zum Bewusstsein' – als Reizfilter. Während ein neurotypisches Gehirn Hintergrundgeräusche, visuelle Reize und Körperempfindungen automatisch dämpft, dringen diese Signale bei neurodivergenten Menschen ungefiltert und mit gleicher Intensität in die Großhirnrinde ein. Im Hochschulalltag (z. B. im überfüllten KIT-Audimax oder in der Mensa) führt dies dazu, dass das Gehirn unter Dauerstress steht. Der Overload baut sich oft über Stunden unbemerkt auf und entlädt sich abrupt in Meltdowns (Ausbrüchen) oder Shutdowns (Erstarrung).",
    voices: {
      nt: "Ich unterhalte mich einfach mit meinen Freunden und esse mein Schnitzel. Es ist zwar laut, aber mein Reizfilter arbeitet einwandfrei. Nach dem Essen bin ich vielleicht etwas müde, aber zu Hause trinke ich eine Tasse Tee und mein Akku ist sofort wieder voll.",
      adhd: "Das Chaos lenkt mich extrem ab. Ich verliere ständig den Faden im Gespräch, schaue überall hin und spüre ein lautes inneres Rauschen. Gleichzeitig suche ich manchmal aktiv nach Stimulation, aber dieses ungeordnete Gewusel überfordert mich schnell und ich muss den Raum fluchtartig verlassen.",
      asd: "Das Surren der Neonröhren tut physisch weh. Ich kann die Stimmen meiner Freunde nicht mehr filtern – alles fließt in einen schmerzvollen Lärmteppich. Wenn ich jetzt meine Noise-Cancelling-Kopfhörer nicht aufsetze und die Augen schließe, bricht mein System komplett zusammen und schaltet in den reinen Überlebensmodus.",
      audhd: "Mein ADHS-Teil will unbedingt mit den anderen lachen, reden und Dopamin sammeln, aber mein autistischer Teil kollabiert unter der visuellen und taktilen Reizflut. Ich stehe mitten im Getümmel, friere komplett ein (Shutdown) und lächele nur noch verkrampft nach außen hin."
    },
    ratings: { nt: 1, adhd: 3, asd: 5, audhd: 4 }
  },
  {
    id: 2,
    nameEN: "Seeks Familiarity",
    nameDE: "Suche nach Vertrautheit",
    definition: "Das aktive Aufsuchen bekannter Muster, Medien, Speisen oder Umgebungen als bewusste Regulationsstrategie für das Nervensystem.",
    scenario: "Du planst ein Abendessen. Ein Kollege schlägt spontan ein brandneues indisches Streetfood-Lokal mit völlig ungewohnten Gewürzen und unbekanntem Menü vor.",
    deepDive: "Das Gehirn ist eine Vorhersagemaschine. Die Verarbeitung neuer Situationen kostet massiv Energie. Für autistische Menschen, deren Reizfilter ohnehin offen sind, bietet das Bekannte eine Oase der Vorhersehbarkeit. Dies zeigt sich im wiederholten Schauen derselben Serie (wo man bereits jede Wendung kennt), dem Essen von 'Safe Foods' (keine sensorischen Überraschungen bei Textur oder Geschmack) oder dem Begehen exakt gleicher Wege. Es ist eine gesunde Coping-Strategie, um die soziale Batterie wieder aufzuladen.",
    voices: {
      nt: "Klingt super spannend! Ich kenne zwar die indischen Speisen nicht, freue mich aber auf das neue Geschmackserlebnis und probiere gerne etwas Spontanes aus. Wenn es mir nicht schmeckt, ist das auch kein Weltuntergang.",
      adhd: "Endlich Abwechslung! Jedes Mal das Gleiche zu essen langweilt mich zu Tode. Ich brauche ständig neue Restaurants, neue Playlists und neue Routen, sonst schläft mein Gehirn ein. Ich bestelle sofort das außergewöhnlichste Gericht auf der Karte.",
      asd: "Ich brauche meine bekannten Safe Foods. Eine unbekannte Textur oder ein unerwarteter Geschmack erzeugt bei mir echten physischen Stress. Da ich mich nicht darauf einstellen kann, bleibe ich lieber zu Hause und koche mein bewährtes Nudelgericht der immer gleichen Marke.",
      audhd: "Ich stimme begeistert zu, weil mein ADHS-Teil das Dopamin des Abenteuers sucht. Als wir ankommen und alles laut und unübersichtlich aussieht, blockiert mein autistischer Teil. Ich fühle mich verloren und bestelle das einzige vertraut wirkende Gericht, um mich irgendwie zu regulieren."
    },
    ratings: { nt: 2, adhd: 1, asd: 5, audhd: 3 }
  },
  {
    id: 3,
    nameEN: "Difficulty with Social Cues",
    nameDE: "Schwierigkeiten mit sozialen Signalen",
    definition: "Eine nicht-intuitive Verarbeitung nonverbaler Kommunikation und impliziter sozialer Regeln.",
    scenario: "In einer Kaffeepause erzählt eine Kollegin eine ironisch gemeinte Anekdote über ihren Chef und blickt dich dann vielsagend an.",
    deepDive: "Soziale Interaktion basiert bei neurotypischen Menschen auf intuitiver Synchronisation. Für autistische Menschen ist soziale Kommunikation oft wie das Erlernen einer Fremdsprache ohne Grammatikbuch. Sie müssen Blickkontakt, das Timing für Gesprächsbeiträge und die Bedeutung von Redewendungen rational analysieren und berechnen. Das Double Empathy Problem (nach Damian Milton) zeigt, dass autistische Menschen untereinander hervorragend und empathisch kommunizieren – die Barriere entsteht erst im inter-neurotypen Austausch.",
    voices: {
      nt: "Ich verstehe den Witz, die Ironie und die unausgesprochene Botschaft sofort. Ich lache passend, erwidere den Blick spielerisch und werfe das Gespräch ganz natürlich und ohne Nachzudenken weiter.",
      adhd: "Ich verstehe soziale Signale meistens ganz gut, bin aber viel zu ungeduldig. Vor Begeisterung falle ich ihr impulsiv ins Wort, erzähle meine eigene Geschichte und merke erst Sekunden später am Gesichtsausdruck der Kollegin, dass das unhöflich war. Danach schäme ich mich heftig.",
      asd: "Smalltalk fühlt sich für mich an wie ein absurdes Skript. Ich nehme ihre Worte wörtlich und verstehe den versteckten Humor nicht. Blickkontakt fühlt sich extrem anstrengend an. Ich muss rational berechnen, welche Reaktion jetzt von mir erwartet wird.",
      audhd: "Mein ADHS-Teil unterbricht sie impulsiv vor Ideen. Gleichzeitig analysiert mein autistischer Teil panisch jede Mikromimik meines Gegenübers und rechnet aus, ob ich gerade eine ungeschriebene soziale Regel verletzt habe. Das erzeugt eine extreme innere Anspannung."
    },
    ratings: { nt: 1, adhd: 2, asd: 5, audhd: 4 }
  },
  {
    id: 4,
    nameEN: "Seeks Repetitive Behaviour",
    nameDE: "Suche nach Gleichförmigkeit",
    definition: "Das bewusste oder unbewusste Wiederholen spezifischer Verhaltensmuster, Gedankengänge oder Handlungsabfolgen zur Strukturierung der Umwelt.",
    scenario: "Du startest deinen Arbeitstag am Schreibtisch. Jemand schlägt vor, deine Tastatur umzustellen und deine festen Lesezeichen im Browser neu zu sortieren.",
    deepDive: "Im Unterschied zu Stimming (das primär der sensorischen Regulation dient) geht es bei dieser Achse um die kognitive Gleichförmigkeit. Das Gehirn baut verlässliche Pfade auf, um Entscheidungsermüdung (Decision Fatigue) zu verhindern. Typische Beispiele sind das Aufrufen von Webseiten in immer der gleichen Reihenfolge, das Laufen auf bestimmten Fliesenmustern oder die Echolalie (das genussvolle Wiederholen von Wörtern oder Sätzen). Dies schenkt dem Gehirn Vorhersehbarkeit und spart exekutive Energie für den Tag.",
    voices: {
      nt: "Kein Problem, ich gewöhne mich schnell an die neue Anordnung und tippe einfach weiter. Es wirft meinen Tag oder meine Laune überhaupt nicht aus der Bahn.",
      adhd: "Gerne! Wiederholungen fühlen sich für mich wie ein Gefängnis an. Ich verändere mein Desktop-Layout sowieso alle zwei Wochen, um mein Gehirn mit frischen visuellen Reizen wachzuhalten, sonst werde ich unruhig.",
      asd: "Das macht mich fassungslos. Ich brauche mein exaktes System. Ohne meine festen Abläufe, Gewohnheiten und die gewohnte Anordnung meiner Werkzeuge fühlt sich mein Gehirn blockiert an, als ob ein Getriebe blockiert wäre.",
      audhd: "Mein ADHS-Teil bricht meine eigenen Handlungsabläufe ständig chaotisch auf und sorgt für Chaos auf dem Schreibtisch. Mein autistischer Teil reagiert darauf jedoch mit massivem Stress und innerer Leere. Ich sabotiere quasi permanent mein eigenes Bedürfnis nach Struktur."
    },
    ratings: { nt: 1, adhd: 1, asd: 5, audhd: 3 }
  },
  {
    id: 5,
    nameEN: "Task Paralysis",
    nameDE: "Aufgaben-Paralyse",
    definition: "Eine exekutive Blockade, bei der eine Person eine anstehende Aufgabe zwar beginnen möchte, das Gehirn jedoch die Handlungsaktivierung verweigert.",
    scenario: "Du musst eine wichtige Hausarbeit schreiben, aber der Dozent hat die Formatierungsvorgaben (Schriftgröße, Zeilenabstand) völlig offengelassen.",
    deepDive: "Aufgaben-Paralyse ist keine Faulheit. Sie basiert auf einer Funktionsstörung im präfrontalen Kortex, der für die Handlungssteuerung zuständig ist. Bei ADHS liegt dies oft an einem Dopaminmangel – das Gehirn stuft die Aufgabe als nicht lohnenswert ein und verweigert den 'Startbefehl'. Bei Autismus entsteht die Paralyse häufig durch Detail-Overload: Wenn die einzelnen Schritte einer Aufgabe nicht absolut klar strukturiert sind, weiß das Gehirn nicht, wo es anfangen soll, und friert ein.",
    voices: {
      nt: "Ich habe zwar keine Lust, aber da es sein muss, suche ich mir einfach eine gängige Formatierung aus (z. B. Arial 12, 1.5 Zeilenabstand), setze mich hin und schreibe in Ruhe los. Danach bin ich erleichtert.",
      adhd: "Ich sitze seit Stunden vor dem Schreibtisch. Das Dokument ist geöffnet. Ich will tippen, mein ganzer Körper schreit mich an, dass ich anfangen muss, da die Frist naht. Aber ich starre einfach nur die Wand an, fühle mich schuldig und kann mich physisch nicht bewegen.",
      asd: "Da der erste Schritt (die exakte Formatierung) unklar und nicht präzise definiert ist, kann ich die gesamte Arbeit nicht beginnen. Ich bin wie gelähmt vor der Komplexität des Unbekannten und brauche zwingend klare Vorgaben.",
      audhd: "Mein ADHS-Teil will die Aufgabe einfach chaotisch hinwerfen, um den Druck loszuwerden. Mein autistischer Teil verlangt jedoch ein perfektes, lückenloses System, bevor der erste Schritt getan wird. Diese Kräfte neutralisieren sich – das Ergebnis ist totale Lähmung."
    },
    ratings: { nt: 1, adhd: 5, asd: 3, audhd: 5 }
  },
  {
    id: 6,
    nameEN: "Object Permanence",
    nameDE: "Objektpermanenz",
    definition: "Eine Ausprägung des Arbeitsgedächtnisses, bei der Gegenstände, Aufgaben oder Personen außerhalb des Sichtfeldes de-priorisiert werden und in Vergessenheit geraten.",
    scenario: "Du räumst deine frischen Einkäufe auf. Du legst das frische Gemüse tief unten ins geschlossene, blickdichte Gemüsefach deines Kühlschranks.",
    deepDive: "Im neurodivergenten Kontext (insb. ADHS) beschreibt dies die extreme Abhängigkeit des Arbeitsgedächtnisses von visuellen Reizen. Was nicht sichtbar ist, existiert im aktuellen Fokus des Gehirns nicht mehr. Dies führt zu verrottendem Gemüse im Kühlschrank (weil es im Gemüsefach versteckt war), dem Vergessen von Rechnungen in Schubladen oder dem unbeabsichtigten 'Aus den Augen verlieren' von Freunden, weil kein visueller Trigger an sie erinnert ('Out of Sight, Out of Mind').",
    voices: {
      nt: "Ich weiß, dass das Gemüse dort liegt. Wenn ich kochen will, mache ich das Fach einfach auf und hole es heraus. Schubladen schränken mein Gedächtnis nicht ein.",
      adhd: "Aus den Augen, aus dem Sinn! Sobald das Gemüse hinter der Klappe verschwindet, existiert es für mein Gehirn schlicht nicht mehr. Wochen später finde ich es als flüssige Masse wieder. Ich muss alles offen liegen lassen, damit ich weiß, dass ich es besitze.",
      asd: "Ich habe ein extrem strukturiertes Ordnungssystem. Jedes Ding hat seinen festen, beschrifteten Platz in einem geschlossenen Schrank. Ich vergesse das Gemüse nicht, da ich mir seine Position logisch eingeprägt habe. Das schützt mich vor visuellem Overload.",
      audhd: "Ich brauche geschlossene, minimalistische Schränke, weil mich herumliegendes Zeug visuell komplett überfordert. Sobald ich die Sachen aber wegräume, vergisst mein ADHS-Teil sofort, dass sie existieren, und ich kaufe Lebensmittel dreimal doppelt."
    },
    ratings: { nt: 1, adhd: 5, asd: 1, audhd: 4 }
  },
  {
    id: 7,
    nameEN: "Impulsivity",
    nameDE: "Impulsivität",
    definition: "Das Ausführen von Handlungen oder das Äußern von Gedanken ohne vorherige rationale Abwägung der Konsequenzen.",
    scenario: "Du entdeckst online ein teures Gadget für dein aktuelles Spezialinteresse. Es kostet eigentlich zu viel Geld für dein knappes Monatsbudget.",
    deepDive: "Impulsivität ist eng mit der Funktionsweise des Dopaminsystems verknüpft. Das ADHS-Gehirn befindet sich in einem ständigen Zustand des Dopaminmangel. Bietet sich eine Möglichkeit für schnelles Dopamin (ein Spontankauf, das Dazwischenreden in einer Diskussion, eine riskante Entscheidung), greift das Gehirn sofort zu, da die biologische Bremse im Gehirn (die inhibitorische Kontrolle im präfrontalen Kortex) schwächer ausgeprägt ist.",
    voices: {
      nt: "Ich sehe das Gadget, es gefällt mir sehr. Aber ich überlege kurz rational, ob es in mein Budget passt. Da ich nächsten Monat Miete zahlen muss, lasse ich es stehen, schließe den Tab und gehe weiter.",
      adhd: "Mein Gehirn leuchtet auf wie ein Weihnachtsbaum. Ehe ich rational nachdenken kann, habe ich auf 'Jetzt kaufen' geklickt. Der Dopaminkick hält genau zwei Minuten an, danach kommt das bittere, schlechte Gewissen über den Kontrollverlust.",
      asd: "Spontane Käufe machen mir Angst. Ich plane Anschaffungen wochenlang im Voraus, lese Dutzende Rezensionen und vergleiche Preise. Wenn ich ungeplant Geld ausgeben soll, blockiert mein System sofort.",
      audhd: "Mein ADHS-Teil kauft impulsiv im Hyperfokus. Mein autistischer Teil reagiert am nächsten Tag mit Panik und lähmenden Schuldgefühlen über den plötzlichen Kontrollverlust und die Störung des Budgets. Das Gerät erzeugt puren Stress."
    },
    ratings: { nt: 2, adhd: 5, asd: 1, audhd: 4 }
  },
  {
    id: 8,
    nameEN: "Time Blindness",
    nameDE: "Zeitblindheit",
    definition: "Die Unfähigkeit des Gehirns, den Fluss der Zeit intuitiv wahrzunehmen oder die Dauer zukünftiger Aufgaben realistisch einzuschätzen.",
    scenario: "Du musst in 20 Minuten am Bahnhof sein. Du siehst, dass in der Spüle noch ein Teller steht und die Kaffeemaschine gereinigt werden sollte.",
    deepDive: "Zeitblindheit ist eine sensorische Einschränkung des Zeitempfindens. Während neurotypische Menschen eine innere 'Uhr' haben, existieren im ADHS-Gehirn oft nur zwei Zeitzonen: 'JETZT' und 'NICHT JETZT'. Alles, was in der Zukunft liegt, fühlt sich unendlich weit weg an, bis die Deadline plötzlich im 'Jetzt' aufploppt und Panik auslöst. Dies führt zu chronischem Zuspätkommen oder dem paradoxen 'Überpünktlichsein' (Stunden zu früh da sein aus Angst, den Termin zu verpassen).",
    voices: {
      nt: "Ich spüle kurz den Teller ab, ziehe meine Jacke an und gehe in Ruhe los. Ich kann die Zeit gut einschätzen und komme genau 3 Minuten vor Abfahrt des Zuges am Gleis an.",
      adhd: "Zeit ist für mich ein abstraktes Konstrukt. Ich fange an, die Küche zu wischen, und denke, es dauert eine Minute. Plötzlich sind 25 Minuten um, und ich verpasse meinen Zug komplett. Ich verschätze mich permanent.",
      asd: "Ich plane meine Wege minutiös. Ich weiß genau, wann ich das Haus verlassen muss und habe 2 Minuten Puffer für die Fußgängerampel berechnet. Verspätungen oder spontane Planänderungen stressen mich zutiefst.",
      audhd: "Ich gerate durch die Zeitblindheit meines ADHS-Teils ständig in Zeitnot. Um das zu verhindern, erzwingt mein autistischer Teil eine extreme, fast zwanghafte Pünktlichkeitsstruktur. Ich kann an Tagen mit einem Termin um 14 Uhr ab 10 Uhr morgens nichts mehr tun (Wartemodus)."
    },
    ratings: { nt: 1, adhd: 5, asd: 2, audhd: 4 }
  },
  {
    id: 9,
    nameEN: "Dopamine Seeking",
    nameDE: "Dopamin-Suche",
    definition: "Das ständige, biologisch getriebene Bedürfnis des Gehirns nach Stimulation, Neuheit und Belohnung, um ein chronisch niedriges Basal-Dopaminniveau auszugleichen.",
    scenario: "Du musst dich durch eine extrem trockene, langweilige Excel-Tabelle arbeiten. Dein Smartphone liegt neben dir auf dem Schreibtisch.",
    deepDive: "Dopamin ist der Botenstoff, der Motivation, Antrieb und das Gefühl von Belohnung steuert. ADHS-Gehirne weisen eine geringere Dopamin-Rezeptordichte oder einen zu schnellen Rücktransport des Dopamins auf. Das Gehirn befindet sich im Leerlauf und empfindet diesen Zustand als physisch unangenehm. Daher sucht es ununterbrochen nach Stimulanzien: Koffein, zuckerhaltige Snacks, aufregende Hobbys (die schnell wieder aufgegeben werden), ständiges Smartphone-Checking oder Nervenkitzel.",
    voices: {
      nt: "Es macht keinen Spaß, aber ich ziehe es einfach durch und arbeite die Tabelle ab. Danach mache ich eine wohlverdiente Pause, trinke einen Kaffee und freue mich auf den Feierabend.",
      adhd: "Mein Gehirn weigert sich. Ich verspüre eine fast physische Unruhe und greife alle zwei Minuten impulsiv zum Smartphone, um die Benachrichtigungen zu checken (Dopamin-Hunger). Ohne ständige Stimulation schläft mein Kopf ein.",
      asd: "Ich brauche keine ständige Neuheit. Ich finde meine Befriedigung in der tiefen, systematischen Beschäftigung mit meinen Spezialgebieten. Trockene Routinen stören mich kaum, solange sie einen klaren Sinn ergeben.",
      audhd: "Ich stecke in einer Dauerschleife: Mein ADHS-Teil will den nächsten Dopaminkick und greift zum Handy. Mein autistischer Teil rebelliert, weil die Ablenkung die Arbeitsstruktur zerstört. Ich bin gleichzeitig unterstimuliert und überfordert."
    },
    ratings: { nt: 2, adhd: 5, asd: 1, audhd: 4 }
  },
  {
    id: 10,
    nameEN: "Hyperactivity (Body/Brain)",
    nameDE: "Hyperaktivität (Körper/Geist)",
    definition: "Ein Zustand gesteigerter motorischer Unruhe (körperlich) oder eines unaufhörlichen, rasenden Gedankenflusses (mental).",
    scenario: "Du liegst abends im Bett. Das Licht ist aus, es ist vollkommen leise im Raum und du möchtest schlafen.",
    deepDive: "Hyperaktivität verlagert sich im Erwachsenenalter oft nach innen. Die körperliche Hyperaktivität äußert sich in Fidgeting (Wippen mit dem Fuß, Spielen mit Stiften). Die mentale Hyperaktivität zeigt sich als ein ununterbrochener Gedankenstrom – wie 20 parallel geöffnete Browser-Tabs, auf denen Musik läuft, Nachrichten tickern und gearbeitet wird. Dies führt oft zu Schlafproblemen, da das Gehirn abends den 'Ausschaltknopf' nicht findet.",
    voices: {
      nt: "Ich gehe kurz den Tag durch, atme tief durch und schlafe nach etwa 15 Minuten friedlich ein. Mein Kopf wird nachts ganz natürlich ruhig.",
      adhd: "Mein Kopf ist ein Hauptbahnhof zur Rushhour. Gedanken rasen unkontrolliert im Kreis, springen von Thema zu Thema. Körperlich wippe ich ununterbrochen mit dem Fuß unter der Decke, da ich mich einfach bewegen muss.",
      asd: "Meine Gedanken rasen nicht chaotisch, sondern vertiefen sich logisch in ein bestimmtes Fachthema. Meine körperliche Aktivierung reguliere ich gezielt durch monotones Stimming (z. B. sanftes Schaukeln).",
      audhd: "Mein ADHS-Teil erzeugt ein wildes Gedankenchaos im Kopf und treibt mich an, aufzustehen. Mein autistischer Teil verlangt absolute körperliche Starre und Ruhe. Ich liege bewegungslos im Bett, während mein Gehirn innerlich explodiert."
    },
    ratings: { nt: 1, adhd: 5, asd: 2, audhd: 4 }
  },
  {
    id: 11,
    nameEN: "Executive Dysfunction",
    nameDE: "Exekutive Dysfunktion",
    definition: "Eine neurologische Beeinträchtigung der exekutiven Funktionen, die für die Planung, Organisation, Priorisierung und Initiierung von Handlungen verantwortlich sind.",
    scenario: "Deine Wohnung müsste dringend aufgeräumt werden. Überall liegen Kleider, Bücher und Geschirr ungeordnet herum.",
    deepDive: "Exekutive Dysfunktion ist der 'Flaschenhals' des neurodivergenten Alltags. Der präfrontale Kortex arbeitet wie der Dirigent eines Orchesters. Bei exekutiver Dysfunktion weigert sich der Dirigent zu arbeiten: Das Gehirn kann anstehende Aufgaben nicht in logische Teilschritte zerlegen, verliert den Überblick über Fristen, verlegt Werkzeuge und scheitert am 'Aufräumen' oder der Alltagsbürokratie. Dies führt oft zu hoher mentaler Last (Mental Load) und dem Gefühl der Unzulänglichkeit trotz hoher Intelligenz.",
    voices: {
      nt: "Ich nehme mir einen Wäschekorb, fange in einer Ecke an, sortiere die Kleidung und spüle das Geschirr. Nach einer Stunde bin ich fertig, ohne dass es mich mental blockiert.",
      adhd: "Ich sehe das Chaos und mein Gehirn kapituliert sofort. Ich fange an, ein Buch wegzuräumen, finde dabei ein altes Foto, betrachte es, gehe in die Küche, fange an zu spülen, vergesse es und stehe plötzlich im Garten und gieße Blumen.",
      asd: "Ich kann Ordnung halten, solange ich die volle Kontrolle über meine Umgebung habe. Wenn mir jedoch ein unstrukturiertes Chaos von außen aufgezwungen wird, bricht meine exekutive Planung zusammen und ich blockiere komplett.",
      audhd: "Mein autistischer Teil leidet unter der Unordnung und braucht dringend Struktur. Mein ADHS-Teil blockiert jedoch bei der exekutiven Ausführung. Ich lebe im stresserzeugenden Chaos, unfähig, es zu beseitigen."
    },
    ratings: { nt: 1, adhd: 5, asd: 3, audhd: 5 }
  },
  {
    id: 12,
    nameEN: "Masking",
    nameDE: "Maskierung",
    definition: "Das bewusste oder unbewusste Erlernen und Anwenden neurotypischer Verhaltensweisen, um soziale Ablehnung zu vermeiden.",
    scenario: "Du nimmst an einem großen Networking-Event oder einer Feier mit vielen fremden Menschen teil.",
    deepDive: "Masking (oder Camouflaging) ist eine Überlebensstrategie in einer mehrheitlich neurotypischen Welt. Betroffene lernen durch Beobachtung, wie man 'richtig' Augenkontakt hält, wie man Smalltalk führt oder welche Bewegungen (wie Stimming) gesellschaftlich geächtet sind. Dieses ständige Schauspiel läuft permanent im Hintergrund und verbraucht gigantische Mengen mentaler Energie. Langfristiges, tiefes Masking führt oft zu Identitätsverlust (Wer bin ich eigentlich ohne Maske?) und chronischem Burnout.",
    voices: {
      nt: "Ich passe mein Verhalten ganz ungezwungen an das Gegenüber an. Das kostet mich keine besondere Anstrengung oder Energie, es ist einfach normales, flexibles Sozialverhalten.",
      adhd: "Ich zwinge mich, ruhig dazustehen, nicht zu unterbrechen und den Leuten nicht ins Wort zu fallen, obwohl ich innerlich platze. Ich spiele den perfekten Zuhörer, bin aber danach völlig erschöpft.",
      asd: "Ich spiele eine Rolle nach einem erlernten Drehbuch. Ich lächele, wenn andere lächeln, und berechne meinen Blickkontakt. Zu Hause falle ich erschöpft in einen Shutdown – die Maske abzunehmen ist wie das Ablegen einer zentnerschweren Rüstung.",
      audhd: "Mein ADHS-Teil will laut, impulsiv und exzentrisch sein. Mein autistischer Teil hat extreme Angst vor sozialer Ablehnung und erzwingt eine perfekte Maske. Ich maskiere so gut, dass mir niemand meine Not glaubt."
    },
    ratings: { nt: 2, adhd: 3, asd: 5, audhd: 5 }
  },
  {
    id: 13,
    nameEN: "Stimming & Fidgeting",
    nameDE: "Körperliche Selbstregulation",
    definition: "Selbststimulierende Bewegungen, Lautäußerungen oder Handlungen zur Regulation des neurologischen Erregungsniveaus.",
    scenario: "Du sitzt in einer anstrengenden, mehrstündigen Vorlesung oder einem sehr langen Meeting.",
    deepDive: "Stimming (Self-Stimulatory Behaviour) ist ein wichtiges neurologisches Werkzeug: Wenn das Gehirn überflutet ist, hilft die monotone Bewegung (Schaukeln, Händeflattern, Summen), das Nervensystem zu beruhigen. Bei Unterstimulation (Langeweile) hilft Fidgeting (Kippeln, Stiftdrehen), das Dopaminniveau hochzuhalten, um den Fokus nicht zu verlieren. Es dient somit der aktiven Homöostase des Nervensystems.",
    voices: {
      nt: "Ich spiele vielleicht kurz mit meinem Stift oder wippe mit dem Fuß, wenn ich müde werde, kann aber problemlos ruhig dasitzen und aufpassen, ohne dass ich mich unruhig fühle.",
      adhd: "Ohne Fidgeting schläft mein Gehirn ein. Ich muss ununterbrochen auf meinem Stuhl herumrutschen, mit Stiften spielen oder mit dem Fuß wippen, um überhaupt fokussiert zu bleiben. Stillsitzen blockiert mein Denken.",
      asd: "Monotones Stimming erdet mich. Ich wippe sanft mit dem Oberkörper oder reibe meine Hände aneinander. Das sensorische Feedback hilft mir, schmerzhafte Reize im Raum zu blockieren und mich zu regulieren.",
      audhd: "Mein autistischer Teil braucht intensives Stimming (wie Summen oder Handflapping) zur Regulation. Mein ADHS-Teil schämt sich dafür und unterdrückt es durch Masking. Stattdessen spanne ich unbemerkt meine Muskeln an."
    },
    ratings: { nt: 1, adhd: 4, asd: 5, audhd: 4 }
  },
  {
    id: 14,
    nameEN: "Emotional Dysregulation",
    nameDE: "Emotionale Dysregulation",
    definition: "Eine verminderte Fähigkeit, die Intensität, Dauer und den Ausdruck von Emotionen kognitiv zu dämpfen.",
    scenario: "Ein Dozent oder Vorgesetzter äußert eine sachliche Kritik an einem von dir erstellten Entwurf.",
    deepDive: "Emotionen treffen neurodivergente Menschen oft mit der Wucht eines Tsunamis. Es gibt kaum einen 'Puffer' zwischen dem Auslöser und dem Gefühl. Dies basiert auf einer veränderten Konnektivität zwischen der Amygdala (dem emotionalen Alarmzentrum) und dem präfrontalen Kortex. Es betrifft auch positive Emotionen wie Hyperfocus Joy (extreme Euphorie), führt aber auch dazu, dass kleine Rückschläge eine tiefe, existentielle Verzweiflung auslösen können.",
    voices: {
      nt: "Es ärgert mich kurz, aber ich kann das Feedback sachlich einordnen, atme tief durch und passe die Punkte an. Ich nehme es keinesfalls persönlich.",
      adhd: "Die Kritik trifft mich wie ein emotionaler Tsunami. Mein Gehirn schaltet sofort auf Alarm. Ich spüre eine tiefe, fast physisch schmerzhafte Ablehnung (RSD) und möchte alles hinwerfen. Gefühle überfluten mich komplett.",
      asd: "Gefühle überfluten mich so intensiv, dass ich sie gar nicht benennen kann (Alexithymie). Ich spüre eine gigantische körperliche Anspannung, die in Weinkrämpfen oder totalem Shutdown mündet.",
      audhd: "Mein ADHS-Teil reagiert blitzschnell emotional. Mein autistischer Teil versucht jedoch krampfhaft, absolute Kontrolle und Kälte nach außen zu wahren. Dieser Druck führt dazu, dass Emotionen stauen und explodieren."
    },
    ratings: { nt: 2, adhd: 5, asd: 4, audhd: 5 }
  },
  {
    id: 15,
    nameEN: "Sensory Sensitivities",
    nameDE: "Sensorische Besonderheiten",
    definition: "Spezifische, dauerhafte Über- (Hyper-) oder Unter- (Hypo-) Empfindlichkeiten des Nervensystems gegenüber bestimmten sensorischen Kanälen.",
    scenario: "Du ziehst ein neues Kleidungsstück an und bemerkst ein kratziges Schildchen oder Etikett im Nacken.",
    deepDive: "Im Gegensatz zum akuten Sensory Overload beschreibt diese Achse die konkreten Filter-Besonderheiten der einzelnen Sinne im Alltag. Jemand mit taktiler Hypersensitivität spürt Kleidungsetiketten wie Schmirgelpapier auf der Hautrezeptorebene. Umgekehrt kann eine Hyposensitivität dazu führen, dass Personen Schmerzen oder Kälte kaum wahrnehmen und aktiv nach starker körperlicher Stimulation (z. B. extrem scharfem Essen, eiskalten Duschen oder gewichteten Decken) suchen.",
    voices: {
      nt: "Das Etikett kratzt zwar anfangs ganz leicht, aber mein Gehirn blendet diesen Reiz nach fünf Minuten einfach aus. Ich denke den restlichen Tag überhaupt nicht mehr darüber nach.",
      adhd: "Das Etikett kratzt unaufhörlich und stört meine Konzentration massiv. Ich kann mich auf kein Gespräch konzentrieren, bis ich es mit einer Schere sauber herausgeschnitten habe. Es nervt mich unglaublich.",
      asd: "Das Etikett fühlt sich an wie Schmirgelpapier auf roher Haut. Es löst bei mir echte Schmerzsignale aus. Ich muss den Pullover sofort ausziehen – ich trage ausschließlich nahtlose, weiche Kleidung.",
      audhd: "Mein autistischer Teil leidet unter den sensorischen Schmerzen (Hypersensitivität). Mein ADHS-Teil sucht jedoch Dopamin durch intensive sensorische Reize (laute Bässe, scharfes Essen). Ich verletze ständig meine eigenen sensorischen Grenzen."
    },
    ratings: { nt: 1, adhd: 3, asd: 5, audhd: 4 }
  },
  {
    id: 16,
    nameEN: "Special Interests / Hyperfixations",
    nameDE: "Spezialinteressen / Hyperfixationen",
    definition: "Ein Zustand intensiver, hochgradig fokussierter und leidenschaftlicher Beschäftigung mit einem bestimmten Thema.",
    scenario: "Du stößt im Internet auf ein faszinierendes neues Thema (z. B. das U-Bahn-Netz von Tokio oder antike Webstühle).",
    deepDive: "Spezialinteressen (ASS) und Hyperfixationen (ADHS) sind weit mehr als Hobbys – sie sind die Lebensenergie neurodivergenter Menschen. Sie basieren auf dem Monotropismus: Das Gehirn lenkt all seine Aufmerksamkeitsressourcen in einen einzigen Fokuskanal. Eine ADHS-Hyperfixation flammt oft explosionsartig auf, brennt extrem heiß für einige Wochen und erlischt ebenso schnell wieder. Ein autistisches Spezialinteresse ist oft ein lebenslanger, systematischer Anker, der dem Leben Sinn, Struktur und pure Freude verleiht.",
    voices: {
      nt: "Ich finde das Thema ganz nett, lese mir den Wikipedia-Artikel durch und habe einfach ein nettes Hobby, über das ich am Wochenende manchmal nachdenke.",
      adhd: "Eine Hyperfixation flammt explosionsartig auf. Ich recherchiere drei Nächte ohne Schlaf, kaufe Fachbücher, rede über nichts anderes mehr – und verliere nach vier Wochen schlagartig jedes Interesse.",
      asd: "Ein lebenslanges Spezialinteresse wird geweckt. Ich beginne, das Thema akribisch zu systematisieren, erstelle Tabellen und sammle Daten. Diese Beschäftigung ist mein sicherer Anker und lädt meine Energie auf.",
      audhd: "Ich lebe im Dauer-Hobby-Verschleiß. Mein ADHS-Teil stürzt sich obsessiv und teuer in neue Hyperfixationen. Mein autistischer Teil leidet unter dem Verlust der Beständigkeit und schämt sich für das unfertige Chaos."
    },
    ratings: { nt: 2, adhd: 5, asd: 5, audhd: 5 }
  },
  {
    id: 17,
    nameEN: "Difficulty Prioritising",
    nameDE: "Priorisierungsprobleme",
    definition: "Die Unfähigkeit des exekutiven Systems, anstehende Aufgaben, Reize oder Informationen nach ihrer tatsächlichen Wichtigkeit oder Dringlichkeit zu filtern.",
    scenario: "Du hast fünf Aufgaben: Steuererklärung machen (dringend), Kleiderschrank aufräumen, Geschirr spülen, E-Mails beantworten, Müll rausbringen.",
    deepDive: "Ein funktionierendes exekutives System wägt ab: Hausarbeit schreiben (wichtig), Müll rausbringen (dringend), Kleiderschrank sortieren (unwichtig). Bei neurodivergenen Menschen fehlt dieser automatische Filter. Das Gehirn wird von allen anstehenden Aufgaben gleichzeitig lautstark 'angeschrien'. Da alles die gleiche Priorität 1 zu haben scheint, entsteht ein massiver kognitiver Overload. Das Gehirn kapituliert vor der Unmöglichkeit der Entscheidung und flüchtet oft in die Paralyse.",
    voices: {
      nt: "Ich fange natürlich mit der dringendsten Steuererklärung an. Die anderen Dinge erledige ich danach oder morgen, das stresst mich nicht.",
      adhd: "Alle Aufgaben schreien mich gleichzeitig mit der gleichen Lautstärke an. Da mein Gehirn nicht filtern kann, was wichtiger ist, fange ich panisch an, den Kleiderschrank aufzuräumen, während ich wegen der Steuererklärung zittere.",
      asd: "Ich versuche, alle Aufgaben mit 100%iger Perfektion gleichzeitig zu erledigen, da mir klare Kriterien für Wichtigkeit fehlen. Das führt zu extremem Perfektionismus und schnellem Erschöpfungs-Burnout.",
      audhd: "Mein autistischer Teil braucht eine perfekte, logische Liste, um handlungsfähig zu sein. Mein ADHS-Teil bricht sie sofort auf, da er impulsiv tut, was das meiste Dopamin verspricht. Ich erstelle Listen, die ich dann frustriert ignoriere."
    },
    ratings: { nt: 1, adhd: 5, asd: 3, audhd: 5 }
  },
  {
    id: 18,
    nameEN: "Interoception issues",
    nameDE: "Interozeptions-Probleme",
    definition: "Eine veränderte neurologische Verarbeitung der inneren Körpersignale (z. B. Hunger, Durst, Erschöpfung, Blasenfüllung).",
    scenario: "Du arbeitest seit 6 Stunden hochkonzentriert an einem spannenden Projekt am Computer.",
    deepDive: "Interozeption ist unser 'achter Sinn' – die Wahrnehmung des eigenen Körpers von innen. Bei vielen neurodivergenten Menschen (besonders im Autismus-Spektrum) sind diese Rückmeldungen gedämpft oder werden vom Gehirn aufgrund des monotropen Aufmerksamkeitsfokus schlicht ignoriert. Die betroffene Person spürt den Hunger erst, wenn ihr schwindelig wird, oder merkt das Toilettenbedürfnis erst im Moment absoluter Dringlichkeit. Dies ist eine Hauptursache für den gefürchteten 'Crash' am Abend.",
    voices: {
      nt: "Ich merke zwischendurch ganz natürlich, dass mein Magen leise knurrt oder meine Blase voll ist. Ich stehe einfach auf, esse etwas und arbeite entspannt weiter.",
      adhd: "Ich vergesse das Essen und Trinken komplett. Erst wenn ich abends mit hämmernden Kopfschmerzen aufwache, merke ich, dass ich seit Stunden nichts getrunken habe. Mein Körper sendet einfach keine Signale rechtzeitig.",
      asd: "Ich nehme Körpersignale extrem diffus wahr. Ich spüre eine dumpfe Unruhe oder Gereiztheit, weiß aber nicht, warum. Erst wenn mir mein Partner Essen gibt, merke ich: Ich war einfach nur hungrig.",
      audhd: "Im Hyperfokus blende ich alle Körpersignale komplett aus. Sobald der Fokus bricht, bricht mein Körper zusammen: Ich spüre schlagartig extreme Dehydrierung, Gliederschmerzen, eine volle Blase und totale Erschöpfung auf einmal."
    },
    ratings: { nt: 1, adhd: 4, asd: 5, audhd: 4 }
  },
  {
    id: 19,
    nameEN: "Rejection Sensitivity (RSD)",
    nameDE: "Sensibilität für Zurückweisung",
    definition: "Eine extreme, oft physisch schmerzhafte emotionale Reaktion auf die reale oder wahrgenommene Ablehnung, Kritik oder das Gefühl des eigenen Versagens.",
    scenario: "Ein enger Freund verabschiedet sich im Chat mit einer ungewöhnlich kurzen Nachricht ('Ok, bis dann.') ohne Emojis.",
    deepDive: "Rejection Sensitive Dysphoria (RSD) ist ein neurobiologischer Aspekt von ADHS und keine Charakterschwäche. Durch ein hyper-sensibles Nervensystem verarbeitet das Gehirn soziale Ablehnung oder Kritik mit den exakt gleichen Arealen, die für den physischen Schmerz zuständig sind. RSD führt zu einer ständigen Alarmbereitschaft vor sozialem Fehlverhalten. Dies resultiert oft in People Pleasing (extremer Anpassung) oder dem kompletten Rückzug aus sozialen Wagnissen.",
    voices: {
      nt: "Ich denke mir nichts dabei – er wird wohl einfach im Stress sein oder schnell losmüssen. Ich antworte einfach nett und mache weiter.",
      adhd: "Mein Gehirn schlägt Alarm. RSD setzt ein: 'Er hasst mich, ich habe etwas falsch gemacht.' Der Gedanke tut physisch weh, ich kann an nichts anderes mehr denken und grübele stundenlang.",
      asd: "Da ich oft soziale Signale falsch interpretiert habe und ausgegrenzt wurde, bin ich extrem vorsichtig. Ich analysiere die Nachricht rational und suche nach logischen Fehlern in meinem Verhalten.",
      audhd: "Mein ADHS-Teil leidet unter RSD und treibt mich in extremes, erschöpfendes People-Pleasing. Mein autistischer Teil hasst dieses Masking jedoch zutiefst und sehnt sich nach Authentizität. Ich stecke im Dauerzwiespalt."
    },
    ratings: { nt: 2, adhd: 5, asd: 3, audhd: 5 }
  },
  {
    id: 20,
    nameEN: "Needs Routine",
    nameDE: "Bedürfnis nach Routine",
    definition: "Die existenzielle Notwendigkeit von vorhersagbaren, klar strukturierten Abläufen zur Aufrechterhaltung der exekutiven Funktion.",
    scenario: "Du hast deinen Tag fest geplant. Plötzlich ruft ein Freund an und bittet dich, in einer halben Stunde spontan bei einem Umzug zu helfen.",
    deepDive: "Während Seeks Familiarity (2) die emotionale Sicherheit im Bekannten erfasst, sichert Needs Routine das exekutive Zeitgerüst des Tages. Ein strukturbedürftiges Gehirn nutzt Routinen wie eine externe Festplatte: Wenn der Ablauf des Tages fest einprogrammiert ist, muss der präfrontale Kortex keine Energie für Entscheidungen aufwenden. Bricht die Routine (z. B. durch spontane Planänderungen), kollabiert die Handlungsfähigkeit, da das Gehirn unter Stress gerät und die exekutive Kraft für die spontane Re-Strukturierung fehlt.",
    voices: {
      nt: "Ich überlege kurz. Wenn ich Zeit habe, ziehe ich mir feste Schuhe an und gehe gerne helfen – eine nette, spontane Abwechslung für meinen Tag!",
      adhd: "Perfekt! Ich liebe spontane Action. Die Abwechslung rettet mich vor der tödlichen Langeweile meines geplanten Tages und gibt mir sofort Energie.",
      asd: "Die spontane Planänderung wirft mich komplett aus der Bahn. Ohne meine festen Abläufe stürze ich exekutiv ein und gerate in massiven Stress. Ich kann die Transition nicht so schnell vollziehen.",
      audhd: "Das ultimative Dilemma: Mein autistischer Teil benötigt eiserne Routinen, um Angstzustände zu vermeiden. Mein ADHS-Teil bricht diese Routinen jedoch täglich aus Impulsivität und Langeweile selbstsabotierend auf."
    },
    ratings: { nt: 2, adhd: 1, asd: 3, audhd: 3 }
  }
];
