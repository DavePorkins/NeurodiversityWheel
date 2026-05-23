// Mapping Neurodiversity - Master Data Base
// Credit: Savannah Denny (Colour Me Neurospicy) for the 20-parameter model.
// Tonalität: Neuroaffirmativ, einfühlsam und differenziert.

const palaceData = [
  {
    id: 1,
    nameEN: "Sensory Overload",
    nameDE: "Akute Reizüberflutung",
    definition: "Der Zustand, in dem das sensorische Nervensystem mehr Inputs erhält, als es filtern, verarbeiten und abbauen kann.",
    deepDive: "Beim sensorischen Overload versagt der Thalamus – das 'Tor zum Bewusstsein' – als Reizfilter. Während ein neurotypisches Gehirn Hintergrundgeräusche, visuelle Reize und Körperempfindungen automatisch dämpft, dringen diese Signale bei neurodivergenten Menschen ungefiltert und mit gleicher Intensität in die Großhirnrinde ein. Im Hochschulalltag (z. B. im überfüllten KIT-Audimax oder in der Mensa) führt dies dazu, dass das Gehirn unter Dauerstress steht. Der Overload baut sich oft über Stunden unbemerkt auf und entlädt sich abrupt in Meltdowns (Ausbrüchen) oder Shutdowns (Erstarrung).",
    voices: {
      nt: "Wenn es in der Mensa mal extrem laut und wuselig ist, strengt mich das zwar an und ich bin danach etwas platt, aber ich kann mein Gespräch fortführen und mein Essen genießen. Zu Hause trinke ich eine Tasse Tee, und dann ist mein Akku wieder voll.",
      adhd: "Ich suche oft aktiv nach Stimulation und lauter Musik, aber wenn zu viele ungeordnete Reize gleichzeitig auf mich einprasseln – der Staubsauger läuft, jemand redet und das Licht flackert –, werde ich plötzlich extrem gereizt. Mein Fokus zersplittert in tausend Teile, und ich muss den Raum fluchtartig verlassen.",
      ass: "Das Summen der Neonröhren im Seminarraum fühlt sich an wie ein physischer Bohrer in meinem Kopf. Ich kann die Stimme der Dozentin nicht mehr aus dem Stimmengewirr der anderen filtern. Wenn ich jetzt meine Noise-Cancelling-Kopfhörer nicht aufsetze und die Augen schließe, bricht mein System zusammen – ich spüre, wie mein Körper in den reinen Überlebensmodus schaltet.",
      audhd: "Mein ADHS-Teil liebt die Reize auf Festivals, die laute Musik und die tanzende Menge (Dopaminsuche). Doch plötzlich kippt die Situation: Mein autistischer Teil kollabiert unter der visuellen und taktilen Reizflut. Ich stehe mitten in der Menge und friere komplett ein, unfähig zu reagieren."
    },
    ratings: { nt: 1, adhd: 3, ass: 5, audhd: 4 }
  },
  {
    id: 2,
    nameEN: "Seeks Familiarity",
    nameDE: "Suche nach Vertrautheit",
    definition: "Das aktive Aufsuchen bekannter Muster, Medien, Speisen oder Umgebungen als bewusste Regulationsstrategie für das Nervensystem.",
    deepDive: "Das Gehirn ist eine Vorhersagemaschine. Die Verarbeitung neuer Situationen kostet massiv Energie. Für autistische Menschen, deren Reizfilter ohnehin offen sind, bietet das Bekannte eine Oase der Vorhersehbarkeit. Dies zeigt sich im wiederholten Schauen derselben Serie (wo man bereits jede Wendung kennt), dem Essen von 'Safe Foods' (keine sensorischen Überraschungen bei Textur oder Geschmack) oder dem Begehen exakt gleicher Wege. Es ist eine gesunde Coping-Strategie, um die soziale Batterie wieder aufzuladen.",
    voices: {
      nt: "Ich gehe super gerne in mein Stammlokal und esse dort mein Lieblingsgericht. Aber wenn meine Freunde vorschlagen, ein neues nepalesisches Restaurant auszuprobieren, bin ich sofort dabei und freue mich auf das neue Geschmackserlebnis.",
      adhd: "Vertrautheit langweilt mich zu Tode. Wenn ich eine Serie einmal gesehen habe, rühre ich sie nie wieder an. Ich brauche ständig neue Restaurants, neue Playlists und neue Routen beim Spazierengehen, sonst schläft mein Gehirn ein.",
      ass: "Ich schaue seit Jahren jeden Abend dieselbe Folge einer bekannten Serie. Ich kenne die Dialoge auswendig, und genau das beruhigt mein System nach einem chaotischen Unitag. Wenn mein Safe Food – eine bestimmte Nudelmarke – im Supermarkt ausverkauft ist, löst das echten Stress aus, weil mein Gehirn sich nicht auf eine unbekannte Textur einstellen kann.",
      audhd: "Ich will unbedingt ein neues, aufregendes Abenteuer erleben und buche spontan einen Städtetrip (ADHS-Dopaminsuche). Kaum bin ich dort angekommen, gerate ich in Panik und fühle mich völlig verloren, weil mir jegliche vertraute Struktur fehlt. Ich verbringe den ersten Tag im Hotelzimmer und schaue meine vertraute Serie, um mich zu regulieren."
    },
    ratings: { nt: 2, adhd: 1, ass: 5, audhd: 3 }
  },
  {
    id: 3,
    nameEN: "Difficulty with Social Cues",
    nameDE: "Schwierigkeiten mit sozialen Signalen",
    definition: "Eine nicht-intuitive Verarbeitung nonverbaler Kommunikation und impliziter sozialer Regeln.",
    deepDive: "Soziale Interaktion basiert bei neurotypischen Menschen auf intuitiver Synchronisation. Für autistische Menschen ist soziale Kommunikation oft wie das Erlernen einer Fremdsprache ohne Grammatikbuch. Sie müssen Blickkontakt, das Timing für Gesprächsbeiträge und die Bedeutung von Redewendungen rational analysieren und berechnen. Das Double Empathy Problem (nach Damian Milton) zeigt, dass autistische Menschen untereinander hervorragend und empathisch kommunizieren – die Barriere entsteht erst im inter-neurotypen Austausch.",
    voices: {
      nt: "Ich spüre im Gespräch sofort, wenn mein Gegenüber unruhig wird oder das Thema wechseln möchte, und lenke das Gespräch ganz natürlich um. Ich muss nicht darüber nachdenken, wann ich Blickkontakt halte oder wann ich eine Pause im Reden mache.",
      adhd: "Ich verstehe soziale Signale meistens ganz gut, aber ich bin oft viel zu schnell und impulsiv. Ich rede wie ein Wasserfall, unterbreche andere aus Begeisterung und merke erst Sekunden später am Gesichtsausdruck des anderen, dass das unhöflich war. Dann schäme ich mich heftig.",
      ass: "Smalltalk fühlt sich für mich an wie ein absurdes Skript, dessen Sinn sich mir nicht erschließt. Ich weiß nie, wann ich mit dem Sprechen an der Reihe bin, weshalb ich in Gruppen oft komplett schweige. Ich wünsche mir, dass Menschen einfach direkt und wörtlich sagen, was sie meinen, anstatt alles in Andeutungen zu verpacken.",
      audhd: "Ich unterbreche Menschen impulsiv, weil mein ADHS-Gehirn vor Ideen platzt. Gleichzeitig analysiert mein autistischer Teil panisch jede Mikromimik meines Gegenübers und rechnet aus, ob ich gerade eine ungeschriebene soziale Regel verletzt habe. Das führt zu einer extremen inneren Anspannung während jedes Gesprächs."
    },
    ratings: { nt: 1, adhd: 2, ass: 5, audhd: 4 }
  },
  {
    id: 4,
    nameEN: "Seeks Repetitive Behaviour",
    nameDE: "Suche nach Gleichförmigkeit",
    definition: "Das bewusste oder unbewusste Wiederholen spezifischer Verhaltensmuster, Gedankengänge oder Handlungsabfolgen zur Strukturierung der Umwelt.",
    deepDive: "Im Unterschied zu Stimming (das primär der sensorischen Regulation dient) geht es bei dieser Achse um die kognitive Gleichförmigkeit. Das Gehirn baut verlässliche Pfade auf, um Entscheidungsermüdung (Decision Fatigue) zu verhindern. Typische Beispiele sind das Aufrufen von Webseiten in immer der gleichen Reihenfolge, das Laufen auf bestimmten Fliesenmustern oder die Echolalie (das genussvolle Wiederholen von Wörtern oder Sätzen). Dies schenkt dem Gehirn Vorhersehbarkeit und spart exekutive Energie für den Tag.",
    voices: {
      nt: "Ich trage im Haus meistens meine Hausschuhe. Wenn sie mal nicht an ihrem Platz stehen, laufe ich eben barfuß los – das wirft meinen Tag oder meine Laune überhaupt nicht aus der Bahn.",
      adhd: "Wiederholungen fühlen sich für mich wie ein Gefängnis an. Ich brauche Abwechslung! Wenn ich gezwungen bin, jeden Tag den exakt gleichen Ablauf einzuhalten, werde ich unruhig und unproduktiv.",
      ass: "Ich brauche feste Abläufe. Mein Morgen muss sich in einer exakt festgelegten Reihenfolge abspielen: Kaffee mahlen, Zähne putzen, E-Mails checken. Wenn diese Kette durch ein unvorhergesehenes Ereignis unterbrochen wird, fühlt sich mein Gehirn an wie ein Zahnradgetriebe, in das eine Schraube gefallen ist – ich muss mich erst mühsam neu sortieren.",
      audhd: "Mein ADHS-Teil hasst Wiederholungen und bricht meine eigenen Handlungsabläufe ständig chaotisch auf. Mein autistischer Teil reagiert darauf jedoch mit massivem Stress und innerer Leere. Ich sabotiere quasi permanent mein eigenes Bedürfnis nach Gleichförmigkeit."
    },
    ratings: { nt: 1, adhd: 1, ass: 5, audhd: 3 }
  },
  {
    id: 5,
    nameEN: "Task Paralysis",
    nameDE: "Aufgaben-Paralyse",
    definition: "Eine exekutive Blockade, bei der eine Person eine anstehende Aufgabe zwar beginnen möchte, das Gehirn jedoch die Handlungsaktivierung verweigert.",
    deepDive: "Aufgaben-Paralyse ist keine Faulheit. Sie basiert auf einer Funktionsstörung im präfrontalen Kortex, der für die Handlungssteuerung zuständig ist. Bei ADHS liegt dies oft an einem Dopaminmangel – das Gehirn stuft die Aufgabe als nicht lohnenswert ein und verweigert den 'Startbefehl'. Bei Autismus entsteht die Paralyse häufig durch Detail-Overload: Wenn die einzelnen Schritte einer Aufgabe nicht absolut klar strukturiert sind, weiß das Gehirn nicht, wo es anfangen soll, und friert ein.",
    voices: {
      nt: "Ich habe heute wirklich keine Lust, meine Steuererklärung zu machen. Aber ich weiß, dass es sein muss, also setze ich mich einfach hin, fange an und ziehe es in zwei Stunden durch. Danach bin ich erleichtert.",
      adhd: "Ich sitze seit drei Stunden an meinem Schreibtisch. Das Dokument ist geöffnet. Ich will tippen, mein ganzer Körper schreit mich an, dass ich anfangen muss, weil die Deadline naht. Aber ich starre einfach nur die Wand an, fühle mich furchtbar schuldig und kann mich physisch nicht bewegen. Mein Kopf ist blockiert.",
      ass: "Ich soll einen Hausarbeitsentwurf schreiben. Aber weil der Dozent die Formatierungsvorgaben nicht exakt definiert hat, weiß ich nicht, ob ich mit Schriftgröße 11 oder 12 anfangen soll. Da dieser erste Schritt unklar ist, kann ich die gesamte Arbeit nicht beginnen. Ich bin wie gelähmt vor der Komplexität des Unbekannten.",
      audhd: "Mein ADHS-Teil will die Aufgabe einfach schnell und chaotisch hinwerfen, um den Druck loszuwerden. Mein autistischer Teil verlangt jedoch ein perfektes, lückenloses System, bevor der erste Schritt getan wird. Diese beiden Kräfte neutralisieren sich – das Ergebnis ist absolute Lähmung im Stillstand."
    },
    ratings: { nt: 1, adhd: 5, ass: 3, audhd: 5 }
  },
  {
    id: 6,
    nameEN: "Object Permanence",
    nameDE: "Objektpermanenz",
    definition: "Eine Ausprägung des Arbeitsgedächtnisses, bei der Gegenstände, Aufgaben oder Personen außerhalb des Sichtfeldes de-priorisiert werden und in Vergessenheit geraten.",
    deepDive: "Im neurodivergenten Kontext (insb. ADHS) beschreibt dies die extreme Abhängigkeit des Arbeitsgedächtnisses von visuellen Reizen. Was nicht sichtbar ist, existiert im aktuellen Fokus des Gehirns nicht mehr. Dies führt zu verrottendem Gemüse im Kühlschrank (weil es im Gemüsefach versteckt war), dem Vergessen von Rechnungen in Schubladen oder dem unbeabsichtigten 'Aus den Augen verlieren' von Freunden, weil kein visueller Trigger an sie erinnert ('Out of Sight, Out of Mind').",
    voices: {
      nt: "Meine Schlüssel liegen in der Schublade. Ich weiß, dass sie dort sind, auch wenn ich sei nicht sehe. Wenn ich das Haus verlasse, hole ich sie einfach heraus.",
      adhd: "Wenn ich meine Schlüssel oder mein Portemonnaie in eine Schublade lege, sind sie für mich gelöscht. Ich muss alles offen auf meinem Tisch liegen lassen (visuelles Chaos), damit ich überhaupt weiß, dass ich diese Dinge besitze. Wenn ich Gemüse ins Gemüsefach lege, finde ich es drei Wochen später als flüssige Masse wieder.",
      ass: "Ich habe ein extrem strukturiertes Ordnungssystem. Jedes Ding hat seinen festen, beschrifteten Platz in einem geschlossenen Schrank. Ich vergesse die Dinge nicht, weil ich mir ihre Position logisch eingeprägt habe. Das geschlossene System schützt mich vor visuellem Overload.",
      audhd: "Ich brauche geschlossene, minimalistische Schränke, weil mich herumliegendes Zeug visuell komplett überfordert und mein autistischer Teil verlangt Ordnung. Sobald ich die Sachen aber wegräume, vergisst mein ADHS-Teil sofort, dass sie existieren, und ich kaufe Dinge dreimal doppelt."
    },
    ratings: { nt: 1, adhd: 5, ass: 1, audhd: 4 }
  },
  {
    id: 7,
    nameEN: "Impulsivity",
    nameDE: "Impulsivität",
    definition: "Das Ausführen von Handlungen oder das Äußern von Gedanken ohne vorherige rationale Abwägung der Konsequenzen.",
    deepDive: "Impulsivität ist eng mit der Funktionsweise des Dopaminsystems verknüpft. Das ADHS-Gehirn befindet sich in einem ständigen Zustand des Dopaminmangels. Bietet sich eine Möglichkeit für schnelles Dopamin (ein Spontankauf, das Dazwischenreden in einer Diskussion, eine riskante Entscheidung), greift das Gehirn sofort zu, da die biologische Bremse im Gehirn (die inhibitorische Kontrolle im präfrontalen Kortex) schwächer ausgeprägt ist.",
    voices: {
      nt: "Ich sehe ein schönes Paar Schuhe im Schaufenster. Sie gefallen mir, aber ich überlege kurz, ob sie in mein Budget passen. Da ich nächsten Monat Miete zahlen muss, lasse ich sie stehen und gehe weiter.",
      adhd: "Ich sehe online ein Gadget für mein aktuelles Hobby. Mein Gehirn leuchtet auf wie ein Weihnachtsbaum. Ehe ich rational nachdenken kann, habe ich auf 'Jetzt kaufen' geklickt. Der Dopaminkick hält genau zwei Minuten an, danach kommt das schlechte Gewissen.",
      ass: "Spontane Entscheidungen machen mir Angst. Ich plane jeden Kauf tagelang im Voraus, lese Rezensionen und vergleiche Preise. Wenn ich ungeplant etwas tun soll, blockiert mein System sofort – ich brauche Zeit, um alle Eventualitäten abzuwägen.",
      audhd: "Mein ADHS-Teil kauft impulsiv ein teures Synthesizer-Set für ein neues Spezialinteresse. Mein autistischer Teil reagiert am nächsten Tag mit Panik und lähmenden Schuldgefühlen über den Kontrollverlust und die Störung des Finanzplans. Das Gerät steht ungeöffnet in der Ecke und erzeugt puren Stress."
    },
    ratings: { nt: 2, adhd: 5, ass: 1, audhd: 4 }
  },
  {
    id: 8,
    nameEN: "Time Blindness",
    nameDE: "Zeitblindheit",
    definition: "Die Unfähigkeit des Gehirns, den Fluss der Zeit intuitiv wahrzunehmen oder die Dauer zukünftiger Aufgaben realistisch einzuschätzen.",
    deepDive: "Zeitblindheit ist eine sensorische Einschränkung des Zeitempfindens. Während neurotypische Menschen eine innere 'Uhr' haben, existieren im ADHS-Gehirn oft nur zwei Zeitzonen: 'JETZT' und 'NICHT JETZT'. Alles, was in der Zukunft liegt, fühlt sich unendlich weit weg an, bis die Deadline plötzlich im 'Jetzt' aufploppt und Panik auslöst. Dies führt zu chronischem Zuspätkommen oder dem paradoxen 'Überpünktlichsein' (Stunden zu früh da sein aus Angst, den Termin zu verpassen).",
    voices: {
      nt: "Ich weiß intuitiv, dass ich für den Weg zum Bahnhof etwa 10 Minuten brauche. Ich schaue kurz auf die Uhr, ziehe mich in Ruhe an und gehe rechtzeitig los, sodass ich genau 3 Minuten vor Abfahrt des Zuges am Gleis stehe.",
      adhd: "Zeit ist für mich ein abstraktes Konstrukt. Ich denke, ich spüle schnell noch das Geschirr (dauert 20 Minuten), obwohl ich in 5 Minuten am KIT sein muss. Ich verschätze mich permanent. Wenn ich einen wichtigen Termin habe, bin ich entweder 40 Minuten zu früh da oder 15 Minuten zu spät – dazwischen gibt es nichts.",
      ass: "Ich plane meine Wege minutiös. Ich weiß genau, dass die Tram um 08:12 Uhr fährt, ich um 08:04 Uhr das Haus verlassen muss und 2 Minuten Puffer für die Fußgängerampel brauche. Ich nutze Fahrpläne als starre Vorgabe. Verspätungen der Bahn stressen mich zutiefst.",
      audhd: "Ich gerate durch die Zeitblindheit meines ADHS-Teils ständig in Zeitnot. Um das zu verhindern, erzwingt mein autistischer Teil eine extreme, fast zwanghafte Pünktlichkeitsstruktur. Ich kann an Tagen mit einem Termin um 14 Uhr ab 10 Uhr morgens nichts mehr tun, weil ich im 'Wartemodus' gefangen bin."
    },
    ratings: { nt: 1, adhd: 5, ass: 2, audhd: 4 }
  },
  {
    id: 9,
    nameEN: "Dopamine Seeking",
    nameDE: "Dopamin-Suche",
    definition: "Das ständige, biologisch getriebene Bedürfnis des Gehirns nach Stimulation, Neuheit und Belohnung, um ein chronisch niedriges Basal-Dopaminniveau auszugleichen.",
    deepDive: "Dopamin ist der Botenstoff, der Motivation, Antrieb und das Gefühl von Belohnung steuert. ADHS-Gehirne weisen eine geringere Dopamin-Rezeptordichte oder einen zu schnellen Rücktransport des Dopamins auf. Das Gehirn befindet sich im Leerlauf und empfindet diesen Zustand als physisch unangenehm. Daher sucht es ununterbrochen nach Stimulanzien: Koffein, zuckerhaltige Snacks, aufregende Hobbys (die schnell wieder aufgegeben werden), ständiges Smartphone-Checking oder Nervenkitzel.",
    voices: {
      nt: "Ich kann mich auch mal zwei Stunden lang durch eine langweilige Excel-Tabelle arbeiten. Es macht keinen Spaß, aber mein Kopf bleibt ruhig. Danach trinke ich einen Kaffee und freue mich auf den Feierabend.",
      adhd: "Mein Gehirn schreit buchstäblich nach Beschäftigung. Wenn ich nichts Spannendes tue, fühle ich mich körperlich unruhig, fast schon depressiv. Ich fange jede Woche ein neues Hobby an, kaufe Zubehör und verliere das Interesse, sobald die erste Hürde kommt und das Dopamin nachlässt.",
      ass: "Ich brauche keine ständige Neuheit. Ich finde meine Befriedigung in der tiefen, systematischen Beschäftigung mit meinen Spezialgebieten. Diese konstante Beschäftigung reguliert mich weit besser als sprunghafte, neue Reize.",
      audhd: "Ich stecke in einer Dauerschleife: Mein ADHS-Teil will den nächsten großen Dopaminkick durch ein spontanes Abenteuer oder ein neues Projekt. Kaum fange ich an, rebelliert mein autistischer Teil, weil die Routine gebrochen wird und das Unbekannte mein System stresst. Ich bin gleichzeitig unterstimuliert und überfordert."
    },
    ratings: { nt: 2, adhd: 5, ass: 1, audhd: 4 }
  },
  {
    id: 10,
    nameEN: "Hyperactivity (Body/Brain)",
    nameDE: "Hyperaktivität (Körper/Geist)",
    definition: "Ein Zustand gesteigerter motorischer Unruhe (körperlich) oder eines unaufhörlichen, rasenden Gedankenflusses (mental).",
    deepDive: "Hyperaktivität verlagert sich im Erwachsenenalter oft nach innen. Die körperliche Hyperaktivität äußert sich in Fidgeting (Wippen mit dem Fuß, Spielen mit Stiften). Die mentale Hyperaktivität zeigt sich als ein ununterbrochener Gedankenstrom – wie 20 parallel geöffnete Browser-Tabs, auf denen Musik läuft, Nachrichten tickern und gearbeitet wird. Dies führt oft zu Schlafproblemen, da das Gehirn abends den 'Ausschaltknopf' nicht findet.",
    voices: {
      nt: "Wenn ich im Bett liege, gehe ich kurz den Tag durch, atme tief durch und schlafe nach etwa 15 Minuten ein. Mein Kopf wird nachts ganz natürlich ruhig.",
      adhd: "Mein Kopf ist ein Hauptbahnhof zur Hauptverkehrszeit. Gedanken rasen in alle Richtungen, springen von Thema zu Thema. Wenn ich versuche, ruhig auf dem Sofa zu sitzen, spüre ich nach kurzer Zeit ein unerträgliches Kribbeln in den Beinen. Ich muss mich bewegen.",
      ass: "Ich habe intensive, aber fokussierte Gedanken. Mein Kopf ras nicht chaotisch, sondern vertieft sich tief in logische Strukturen oder Spezialthemen. Meine körperliche Aktivierung reguliere ich gezielt durch Stimming (z. B. Händeflattern oder Schaukeln).",
      audhd: "Mein ADHS-Teil erzeugt ein wildes, sprunghaftes Gedankenchaos im Kopf und treibt mich an, aufzustehen und etwas zu tun. Mein autistischer Teil verlangt absolute körperliche Starre und Ruhe, um sensorischen Overload zu vermeiden. Ich liege bewegungslos im Bett, während mein Gehirn innerlich explodiert."
    },
    ratings: { nt: 1, adhd: 5, ass: 2, audhd: 4 }
  },
  {
    id: 11,
    nameEN: "Executive Dysfunction",
    nameDE: "Exekutive Dysfunktion",
    definition: "Eine neurologische Beeinträchtigung der exekutiven Funktionen, die für die Planung, Organisation, Priorisierung und Initiierung von Handlungen verantwortlich sind.",
    deepDive: "Exekutive Dysfunktion ist der 'Flaschenhals' des neurodivergenten Alltags. Der präfrontale Kortex arbeitet wie der Dirigent eines Orchesters. Bei exekutiver Dysfunktion weigert sich der Dirigent zu arbeiten: Das Gehirn kann anstehende Aufgaben nicht in logische Teilschritte zerlegen, verliert den Überblick über Fristen, verlegt Werkzeuge und scheitert am 'Aufräumen' oder der Alltagsbürokratie. Dies führt oft zu hoher mentaler Last (Mental Load) und dem Gefühl der Unzulänglichkeit trotz hoher Intelligenz.",
    voices: {
      nt: "Wenn meine Wohnung unordentlich ist, nehme ich mir einen Eimer, fange in der Küche an, räume das Wohnzimmer auf und bin nach einer Stunde fertig. Es erfordert etwas Überwindung, aber es klappt problemlos.",
      adhd: "Die Unordnung in meiner Wohnung blockiert mich komplett. Ich sehe den riesigen Berg an Aufgaben und mein Gehirn kapituliert sofort. Ich fange an, eine Tasse in die Küche zu tragen, sehe dort den Abwasch, fange an zu spülen, vergesse es, als ich den Müll sehe, trage den Müll raus und stehe plötzlich im Garten und gieße Blumen – ohne dass eine einzige Aufgabe fertig wurde.",
      ass: "Ich kann meinen Alltag gut strukturieren, solange ich die volle Kontrolle über meine Umgebung habe. Wenn mir jedoch von außen ein chaotisches System aufgezwungen wird (z. B. unstrukturierte Uni-Projekte), bricht meine exekutive Planung zusammen und ich gerate in massiven Stress.",
      audhd: "Mein autistischer Teil leidet körperlich unter dem Chaos in meiner Wohnung und braucht dringend ein strukturiertes, sauberes Umfeld. Mein ADHS-Teil leidet jedoch unter schwerer exekutiver Dysfunktion, die es mir unmöglich macht, diese Struktur aufrechtzuerhalten. Ich lebe im stresserzeugenden Chaos, unfähig, es zu beseitigen."
    },
    ratings: { nt: 1, adhd: 5, ass: 3, audhd: 5 }
  },
  {
    id: 12,
    nameEN: "Masking",
    nameDE: "Maskierung",
    definition: "Das bewusste oder unbewusste Erlernen und Anwenden neurotypischer Verhaltensweisen, um soziale Ablehnung zu vermeiden.",
    deepDive: "Masking (oder Camouflaging) ist eine Überlebensstrategie in einer mehrheitlich neurotypischen Welt. Betroffene lernen durch Beobachtung, wie man 'richtig' Augenkontakt hält, wie man Smalltalk führt oder welche Bewegungen (wie Stimming) gesellschaftlich geächtet sind. Dieses ständige Schauspiel läuft permanent im Hintergrund und verbraucht gigantische Mengen mentaler Energie. Langfristiges, tiefes Masking führt oft zu Identitätsverlust (Wer bin ich eigentlich ohne Maske?) und chronischem Burnout.",
    voices: {
      nt: "Ich passe mein Verhalten natürlich an, je nachdem, ob ich beim Chef im Büro sitze oder mit meinen Freunden in der Kneipe bin. Das kostet mich keine besondere Kraft, es ist einfach soziale Anpassung.",
      adhd: "Ich zwinge mich in Meetings, stillzusitzen und nicht reinzureden, obwohl ich innerlich fast platze. Ich spiele den ruhigen, fokussierten Mitarbeiter, bin aber nach zwei Stunden so mental erschöpft, dass ich den restlichen Tag im Bett verbringen muss.",
      ass: "Ich habe mir soziale Interaktionen wie ein Drehbuch erarbeitet. Ich lächle, wenn andere lächeln, halte Blickkontakt, indem ich auf die Nasenwurzel meines Gegenübers schaue, und spiele die Rolle der 'perfekt angepassten' Person. Wenn ich nach Hause komme, falle ich oft in einen stummen Shutdown – die Maske abzunehmen ist wie das Ablegen einer zentnerschweren Rüstung.",
      audhd: "Mein ADHS-Teil will laut, impulsiv und exzentrisch sein. Mein autistischer Teil hat jedoch eine extreme Angst vor sozialer Ablehnung und erzwingt eine perfekte, hyper-kontrollierte Maske. Ich maskiere so gut, dass mir niemand meine Neurodivergenz glaubt, während ich innerlich im Burnout versinke."
    },
    ratings: { nt: 2, adhd: 3, ass: 5, audhd: 5 }
  },
  {
    id: 13,
    nameEN: "Stimming & Fidgeting",
    nameDE: "Körperliche Selbstregulation",
    definition: "Selbststimulierende Bewegungen, Lautäußerungen oder Handlungen zur Regulation des neurologischen Erregungsniveaus.",
    deepDive: "Stimming (Self-Stimulatory Behaviour) is ein wichtiges neurologisches Werkzeug: Wenn das Gehirn überflutet ist, hilft die monotone Bewegung (Schaukeln, Händeflattern, Summen), das Nervensystem zu beruhigen. Bei Unterstimulation (Langeweile) hilft Fidgeting (Kippeln, Stiftdrehen), das Dopaminniveau hochzuhalten, um den Fokus nicht zu verlieren. Es dient somit der aktiven Homöostase des Nervensystems.",
    voices: {
      nt: "Wenn ich nervös vor einer Prüfung bin, wippe ich manchmal ein bisschen mit dem Fuß oder spiele mit meinem Ring. Sobald die Prüfung anfängt, vergesse ich das wieder und sitze ruhig da.",
      adhd: "Ich kann mich ohne Fidgeting nicht konzentrieren. Ich brauche immer ein Fidget-Toy in der Hand, muss auf meinem Stuhl herumrutschen oder mit dem Fuß wippen. Wenn man mich zwingt, völlig stillzusitzen, schaltet mein Gehirn nach zwei Minuten komplett ab.",
      ass: "Klassisches Stimming ist mein Lebensretter. Wenn ich überfordert bin, wippe ich mit meinem Oberkörper vor und zurück oder reibe meine Hände aneinander. Das monotone sensorische Feedback erdet mich und blockiert die schmerzhaften Außenreize. In Phasen großer Freude flappere ich impulsiv mit den Händen.",
      audhd: "Mein autistischer Teil braucht intensives Stimming (wie Schaukeln oder Summen), um Reize zu verarbeiten. Mein ADHS-Teil schämt sich jedoch extrem dafür und unterdrückt dieses Verhalten in der Öffentlichkeit durch rigoroses Masking. Stattdessen kanalisiere ich die Energie in unsichtbares, anstrengendes Muskelanspannen."
    },
    ratings: { nt: 1, adhd: 4, ass: 5, audhd: 4 }
  },
  {
    id: 14,
    nameEN: "Emotional Dysregulation",
    nameDE: "Emotionale Dysregulation",
    definition: "Eine verminderte Fähigkeit, die Intensität, Dauer und den Ausdruck von Emotionen kognitiv zu dämpfen.",
    deepDive: "Emotionen treffen neurodivergente Menschen oft mit der Wucht eines Tsunamis. Es gibt kaum einen 'Puffer' zwischen dem Auslöser und dem Gefühl. Dies basiert auf einer veränderten Konnektivität zwischen der Amygdala (dem emotionalen Alarmzentrum) und dem präfrontalen Kortex. Es betrifft auch positive Emotionen wie Hyperfocus Joy (extreme Euphorie), führt aber auch dazu, dass kleine Rückschläge eine tiefe, existentielle Verzweiflung auslösen können.",
    voices: {
      nt: "Wenn mich ein Kollege kritisiert, ärgert mich das zwar kurz, aber ich atme einmal tief durch, trinke einen Kaffee und kann das Feedback nach zehn Minuten sachlich einordnen.",
      adhd: "Meine Gefühle kennen nur zwei Zustände: 0 oder 150 Prozent. Wenn ich mich freue, könnte ich die ganze Welt umarmen. Wenn mich jemand ungerecht behandelt oder kritisiert, brennt in mir sofort eine unkontrollierbare Wut oder eine tiefe Traurigkeit los. Ich fühle mich meinen Emotionen oft völlig ausgeliefert.",
      ass: "Emotionen überfluten mich oft so stark, dass ich sie gar nicht benennen kann (Alexithymie). Ich spüre nur eine gigantische körperliche Anspannung. Wenn diese emotionale Reizflut zu groß wird, mündet sie in einen unkontrollierbaren Weinkrampf (Meltdown) oder totale Erstarrung (Shutdown).",
      audhd: "Mein ADHS-Teil reagiert blitzschnell emotional und impulsiv auf Reize. Mein autistischer Teil versucht jedoch krampfhaft, absolute Kontrolle und emotionale Starre nach außen hin zu wahren. Dieser innere Druck führt dazu, dass sich Emotionen im Körper anstauen, bis sie bei der kleinsten Nichtigkeit explodieren."
    },
    ratings: { nt: 2, adhd: 5, ass: 4, audhd: 5 }
  },
  {
    id: 15,
    nameEN: "Sensory Sensitivities",
    nameDE: "Sensorische Besonderheiten",
    definition: "Spezifische, dauerhafte Über- (Hyper-) oder Unter- (Hypo-) Empfindlichkeiten des Nervensystems gegenüber bestimmten sensorischen Kanälen.",
    deepDive: "Im Gegensatz zum akuten Sensory Overload beschreibt diese Achse die konkreten Filter-Besonderheiten der einzelnen Sinne im Alltag. Jemand mit taktiler Hypersensitivität spürt Kleidungsetiketten wie Schmirgelpapier auf der Hautrezeptorebene. Umgekehrt kann eine Hyposensitivität dazu führen, dass Personen Schmerzen oder Kälte kaum wahrnehmen und aktiv nach starker körperlicher Stimulation (z. B. extrem scharfem Essen, eiskalten Duschen oder gewichteten Decken) suchen.",
    voices: {
      nt: "Natürlich kratzt ein Wollpullover manchmal ein bisschen, aber mein Gehirn blendet das Gefühl nach fünf Minuten aus. Ich denke den restlichen Tag nicht mehr darüber nach.",
      adhd: "Ich bin oft unruhig wegen kleiner sensorischer Störfaktoren. Ein kratziges Etikett in meinem T-Shirt macht mich wahnsinnig – ich kann mich auf kein Gespräch konzentrieren, bis ich es mit der Schere herausgeschnitten habe.",
      ass: "Meine Sinne sind hochsensibel kalibriert. Bestimmte Gerüche (wie Parfüm in der Bahn) lösen bei mir sofort Übelkeit aus. Die Textur von gekochten Zwiebeln fühlt sich in meinem Mund so unerträglich an, dass ich mich übergeben muss. Ich trage nur nahtlose Kleidung aus weicher Baumwolle.",
      audhd: "Ich habe extreme sensorische Empfindlichkeiten, die nach Ruhe und Reizarmut verlangen (ASS). Gleichzeitig sucht mein ADHS-Teil aktiv nach intensiven Sinneseindrücken (wie lauten Bässen oder extremen Geschmäckern), um Dopamin zu generieren. Ich verletze quasi ständig meine eigenen sensorischen Grenzen auf der Suche nach Stimulation."
    },
    ratings: { nt: 1, adhd: 3, ass: 5, audhd: 4 }
  },
  {
    id: 16,
    nameEN: "Special Interests / Hyperfixations",
    nameDE: "Spezialinteressen / Hyperfixationen",
    definition: "Ein Zustand intensiver, hochgradig fokussierter und leidenschaftlicher Beschäftigung mit einem bestimmten Thema.",
    deepDive: "Spezialinteressen (ASS) und Hyperfixationen (ADHS) sind weit mehr als Hobbys – sie sind die Lebensenergie neurodivergenter Menschen. Sie basieren auf dem Monotropismus: Das Gehirn lenkt all seine Aufmerksamkeitsressourcen in einen einzigen Fokuskanal. Eine ADHS-Hyperfixation flammt oft explosionsartig auf, brennt extrem heiß für einige Wochen und erlischt ebenso schnell wieder. Ein autistisches Spezialinteresse ist oft ein lebenslanger, systematischer Anker, der dem Leben Sinn, Struktur und pure Freude verleiht.",
    voices: {
      nt: "Ich interessiere mich für Fotografie. Ich gehe am Wochenende manchmal raus und mache Bilder. Unter der Woche denke ich kaum darüber nach, ich habe einfach ein nettes Hobby.",
      adhd: "Ich entdecke ein neues Thema (z. B. Aquaristik) und mein Gehirn dreht durch. Ich verbringe drei Nächte ohne Schlaf mit der Recherche, kaufe Equipment für Hunderte von Euro und rede über nichts anderes mehr. Nach vier Wochen ist das Aquarium fertig – und mein Interesse verpufft von heute auf morgen komplett.",
      ass: "Mein Spezialinteresse sind die Fahrpläne und die Geschichte des Karlsruher Straßenbahnnetzes. Ich kenne jeden Weichenplan und jedes Modell. Seit zehn Jahren lese ich täglich stundenlang darüber. Dieses Thema zu erforschen und zu systematisieren, lädt meine soziale Batterie wieder auf. Es gibt mir ein tiefes Gefühl von Stimmigkeit.",
      audhd: "Ich lebe in einem ständigen Hobby-Verschleiß: Mein ADHS-Teil stürzt sich obsessiv und teuer in immer neue Hyperfixationen. Mein autistischer Teil trauert jedoch dem Verlust der Beständigkeit nach und schämt sich für das unfertige Chaos der aufgegebenen Spezialinteressen. Ich wünsche mir die Konstanz, kann sie aber chemisch nicht halten."
    },
    ratings: { nt: 2, adhd: 5, ass: 5, audhd: 5 }
  },
  {
    id: 17,
    nameEN: "Difficulty Prioritising",
    nameDE: "Priorisierungsprobleme",
    definition: "Die Unfähigkeit des exekutiven Systems, anstehende Aufgaben, Reize oder Informationen nach ihrer tatsächlichen Wichtigkeit oder Dringlichkeit zu filtern.",
    deepDive: "Ein funktionierendes exekutives System wägt ab: Hausarbeit schreiben (wichtig), Müll rausbringen (dringend), Kleiderschrank sortieren (unwichtig). Bei neurodivergenten Menschen fehlt dieser automatische Filter. Das Gehirn wird von allen anstehenden Aufgaben gleichzeitig lautstark 'angeschrien'. Da alles die gleiche Priorität 1 zu haben scheint, entsteht ein massiver kognitiver Overload. Das Gehirn kapituliert vor der Unmöglichkeit der Entscheidung und flüchtet oft in die Paralyse.",
    voices: {
      nt: "Ich habe heute fünf Dinge zu tun. Ich fange natürlich mit dem dringendsten Bericht an, der morgen fällig ist. Die Wäsche kann ich auch heute Abend oder morgen machen, das stresst mich nicht.",
      adhd: "Für mein Gehirn sind alle Aufgaben gleich laut. Ich müsste für die Klausur lernen, aber der staubige Fernseher starrt mich an. Da mein Gehirn nicht filtern kann, was wichtiger ist, fange ich an, den Fernseher zu putzen, während im Hintergrund mein ganzer Körper vor Panik wegen der Klausur zittert.",
      ass: "Ich kann nur priorisieren, wenn ich ein logisches Regelwerk von außen erhalte. Fehlen mir klare Kriterien für Wichtigkeit, versuche ich, alle Aufgaben mit 100%iger Perfektion gleichzeitig zu erledigen. Das führt zu extremem Perfektionismus und schnellem Burnout.",
      audhd: "Mein autistischer Teil verlangt eine absolut logische, perfekte Prioritätenliste, um handlungsfähig zu sein. Mein ADHS-Teil bricht diese Liste jedoch sofort auf, weil er sich impulsiv der Aufgabe zuwendet, die gerade das meiste Dopamin verspricht. Ich verbringe Stunden mit dem Erstellen von To-Do-Listen, die ich dann frustriert ignoriere."
    },
    ratings: { nt: 1, adhd: 5, ass: 3, audhd: 5 }
  },
  {
    id: 18,
    nameEN: "Interoception issues",
    nameDE: "Interozeptions-Probleme",
    definition: "Eine veränderte neurologische Verarbeitung der inneren Körpersignale (z. B. Hunger, Durst, Erschöpfung, Blasenfüllung).",
    deepDive: "Interozeption ist unser 'achter Sinn' – die Wahrnehmung des eigenen Körpers von innen. Bei vielen neurodivergenten Menschen (besonders im Autismus-Spektrum) sind diese Rückmeldungen gedämpft oder werden vom Gehirn aufgrund des monotropen Aufmerksamkeitsfokus schlicht ignoriert. Die betroffene Person spürt den Hunger erst, wenn ihr schwindelig wird, oder merkt das Toilettenbedürfnis erst im Moment absoluter Dringlichkeit. Dies ist eine Hauptursache für den gefürchteten 'Crash' am Abend.",
    voices: {
      nt: "Ich merke im Laufe des Vormittags, dass mein Magen leise knurrt. Ich hole mir ein Glas Wasser, esse einen Apfel und arbeite entspannt weiter.",
      adhd: "Ich vergesse das Trinken den ganzen Tag. Erst wenn ich abends mit hämmernden Kopfschmerzen aufwache, merke ich, dass ich seit 14 Stunden keinen Schluck Wasser getrunken habe. Mein Körper sendet einfach keine Warnsignale rechtzeitig.",
      ass: "Ich nehme meine Körpersignale extrem diffus wahr. Ich spüre oft eine dumpfe Unruhe oder Reizbarkeit, weiß aber stundenlang nicht, warum. Erst wenn mir mein Partner ein Brot gibt und ich es esse, merke ich: Ich war einfach nur hungrig. Um nicht zu dehydrieren, muss ich mir Wecker stellen, die mich ans Trinken erinnern.",
      audhd: "Im Hyperfokus blenden mein ADHS und mein Autismus alle Körpersignale komplett aus. Ich sitze acht Stunden starr am PC, ohne zu trinken, zu essen oder mich zu bewegen. Sobald der Fokus bricht, bricht mein Körper zusammen: Ich spüre schlagartig extreme Dehydrierung, Gliederschmerzen, eine volle Blase und totale Erschöpfung auf einmal."
    },
    ratings: { nt: 1, adhd: 4, ass: 5, audhd: 4 }
  },
  {
    id: 19,
    nameEN: "Rejection Sensitivity (RSD)",
    nameDE: "Sensibilität für Zurückweisung",
    definition: "Eine extreme, oft physisch schmerzhafte emotionale Reaktion auf die reale oder wahrgenommene Ablehnung, Kritik oder das Gefühl des eigenen Versagens.",
    deepDive: "Rejection Sensitive Dysphoria (RSD) ist ein neurobiologischer Aspekt von ADHS und keine Charakterschwäche. Durch ein hyper-sensibles Nervensystem verarbeitet das Gehirn soziale Ablehnung oder Kritik mit den exakt gleichen Arealen, die für den physischen Schmerz zuständig sind. RSD führt zu einer ständigen Alarmbereitschaft vor sozialem Fehlverhalten. Dies resultiert oft in People Pleasing (extremer Anpassung) oder dem kompletten Rückzug aus sozialen Wagnissen.",
    voices: {
      nt: "Mein Dozent kritisiert meinen Hausarbeitsentwurf und sagt, ich müsse das Konzept komplett überarbeiten. Das ärgert mich kurz, aber ich sehe ein, dass seine Punkte logisch sind, passe den Text an und mache weiter.",
      adhd: "Eine winzige Kritik an meiner Arbeit fühlt sich an wie ein physischer Schlag in die Magengrube. Mein Gehirn übersetzt 'Dieser Satz ist unklar' sofort mit 'Du bist dumm, du hast versagt und alle verachten dich'. Ich weine stundenlang, bin tagelang gelähmt und möchte das Studium am liebsten abbrechen.",
      ass: "Ich habe im Laufe meines Lebens so oft erlebt, dass ich unbewusst soziale Regeln verletzt habe und dafür ausgegrenzt wurde. Diese Erfahrungen haben tiefe Spuren hinterlassen. Ich bin extrem vorsichtig geworden und analysiere jedes Wort dreimal, um bloß keinen Angriffsvektor für Ablehnung zu bieten.",
      audhd: "Mein ADHS-Teil leidet unter heftigstem RSD und treibt mich in ein extremes, erschöpfendes People-Pleasing, um geliebt und akzeptiert zu werden. Mein autistischer Teil hasst dieses unehrliche Masking jedoch zutiefst und sehnt sich nach absoluter Authentizität. Ich befinde mich im Dauerstress zwischen Selbstdarstellung und Selbstverleugnung."
    },
    ratings: { nt: 2, adhd: 5, ass: 3, audhd: 5 }
  },
  {
    id: 20,
    nameEN: "Needs Routine",
    nameDE: "Bedürfnis nach Routine",
    definition: "Die existenzielle Notwendigkeit von vorhersagbaren, klar strukturierten Abläufen zur Aufrechterhaltung der exekutiven Funktion.",
    deepDive: "Während Seeks Familiarity (2) die emotionale Sicherheit im Bekannten erfasst, sichert Needs Routine das exekutive Zeitgerüst des Tages. Ein strukturbedürftiges Gehirn nutzt Routinen wie eine externe Festplatte: Wenn der Ablauf des Tages fest einprogrammiert ist, muss der präfrontale Kortex keine Energie für Entscheidungen aufwenden. Bricht die Routine (z. B. durch spontane Planänderungen), kollabiert die Handlungsfähigkeit, da das Gehirn unter Stress gerät und die exekutive Kraft für die spontane Re-Strukturierung fehlt.",
    voices: {
      nt: "Ich habe meine Morgenroutine. Aber wenn mein Partner vorschlägt, heute spontan beim Bäcker zu frühstücken, freue ich mich über die Abwechslung, ziehe mich schnell an und wir gehen los.",
      adhd: "Ich hasse Routinen! Sie engen mich ein. Jede Routine fühlt sich nach wenigen Tagen an wie ein zäher Kaugummi, den ich ausspucken muss. Ich brauche Spontanität und den Druck des Augenblicks, um aktiv zu werden.",
      ass: "Routinen sind mein Skelett. Ohne meine festen Abläufe stürze ich exekutiv komplett ein. Wenn mein Tag nicht strukturiert ist, verfalle ich in eine lähmende Trägheit und weiß nicht, wie ich den Übergang von einer Aktivität zur nächsten schaffen soll. Planänderungen im laufenden Tag kosten mich unendlich viel Kraft.",
      audhd: "Das ultimative AuDHD-Dilemma: Mein autistischer Teil benötigt dringend starre, eiserne Routinen, um nicht im Chaos zu ertrinken und Angstzustände zu vermeiden. Mein ADHS-Teil bricht diese Routinen jedoch aus purer Langeweile und Impulsivität täglich selbstsabotierend auf. Ich lebe im ständigen Krieg zwischen meinem Bedürfnis nach Struktur und meiner Unfähigkeit, sie einzuhalten."
    },
    ratings: { nt: 2, adhd: 1, ass: 5, audhd: 3 }
  }
];
