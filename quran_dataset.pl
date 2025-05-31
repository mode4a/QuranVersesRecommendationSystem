% Sample Quran verses database
% verse(SurahNumber, VerseNumber, Theme, Audience, Length, Tone, Location)
verse(2, 286, knowledge, believers, long, encouragement, madani).
verse(3, 190, knowledge, humanity, medium, hopeful, madani).
verse(4, 135, justice, believers, medium, command, madani).
verse(2, 183, rule, believers, medium, command, madani).
verse(17, 23, rule, humanity, short, command, makki).
verse(93, 6, story, prophet, short, glad_tidings, makki).
verse(2, 153, patience, believers, short, encouragement, madani).
verse(9, 60, charity, believers, medium, rule, madani).
verse(7, 206, knowledge, believers, short, warning, makki).
verse(12, 1, story, humanity, short, glad_tidings, makki).
verse(2, 6, knowledge, prophet, short, consolation, madani).
verse(2, 8, knowledge, believers, short, warning, madani).
verse(2, 21, rule, humanity, short, command, madani).
verse(2, 23, justice, humanity, short, challenge, madani).
verse(2, 25, knowledge, believers, short, glad_tidings, madani).
verse(3, 7, knowledge, prophet, long, glory, madani).
verse(3, 8, pray, god, short, supplication, madani).
verse(3, 9, pray, god, short, supplication, madani).
verse(3, 12, knowledge, prophet, short, challenge, madani).
verse(3, 55, story, prophet, medium, mercy, madani).
verse(4, 1, creation, humanity, medium, command, madani).
verse(4, 9, justice, believers, short, reassurance, madani).
verse(4, 19, rule, believers, medium, command, madani).
verse(4, 23, rule, believers, long, command, madani).
verse(4, 26, knowledge, believers, short, mercy, madani).
verse(5, 27, story, prophet, medium, lesson, madani).
verse(5, 28, story, humanity, short, piety, madani).
verse(5, 32, justice, humanity, long, warning, madani).
verse(5, 33, rule, humanity, medium, punishment, madani).
verse(5, 35, justice, believers, short, encouragement, madani).


recommend_verse(Surah, Verse, Theme, Audience, Length, Tone, Location) :-
    verse(Surah, Verse, Theme, Audience, Length, Tone, Location).


query_verse([], Theme, Audience, Length, Tone, Location, Pairs) :-
    findall([Surah, Verse], recommend_verse(Surah, Verse, Theme, Audience, Length, Tone, Location), Pairs).

query_verse([theme(Theme)|Rest], _, Audience, Length, Tone, Location, Pairs) :-
    query_verse(Rest, Theme, Audience, Length, Tone, Location, Pairs).

query_verse([audience(Audience)|Rest], Theme, _, Length, Tone, Location, Pairs) :-
    query_verse(Rest, Theme, Audience, Length, Tone, Location, Pairs).

query_verse([length(Length)|Rest], Theme, Audience, _, Tone, Location, Pairs) :-
    query_verse(Rest, Theme, Audience, Length, Tone, Location, Pairs).

query_verse([tone(Tone)|Rest], Theme, Audience, Length, _, Location, Pairs) :-
    query_verse(Rest, Theme, Audience, Length, Tone, Location, Pairs).

query_verse([location(Location)|Rest], Theme, Audience, Length, Tone, _, Pairs) :-
    query_verse(Rest, Theme, Audience, Length, Tone, Location, Pairs).



build_query(Theme, Audience, Length, Tone, Location, Query) :-
    (Theme \= '' -> Q1 = [theme(Theme)]; Q1 = []),
    (Audience \= '' -> Q2 = [audience(Audience)|Q1]; Q2 = Q1),
    (Length \= '' -> Q3 = [length(Length)|Q2]; Q3 = Q2),
    (Tone \= '' -> Q4 = [tone(Tone)|Q3]; Q4 = Q3),
    (Location \= '' -> Query = [location(Location)|Q4]; Query = Q4).

recommend(Theme, Audience, Length, Tone, Location, Pairs) :-
    build_query(Theme, Audience, Length, Tone, Location, Query),
    (   Query = [] ->
        Pairs = []
    ;   query_verse(Query, _, _, _, _, _, Pairs)
    ).