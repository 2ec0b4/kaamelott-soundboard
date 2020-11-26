
% INPUT:
%  - word(N,W): file N uses word W
% OUTPUT:
%  - selword(N,W): file N uses word W in its unique identifier


% Choose at least one word for each N:
1{ selword(N,W): word(N,W) } :- word(N,_).

% Avoid different N having same words.
:- selword(N1,_) ; selword(N2,_) ; N1!=N2 ; selword(N1,X): selword(N2,X) ; selword(N2,Y): selword(N1,Y).

% Minimize amount of selword.
nb_selword(N) :- N={selword(_,_)}.
#minimize{N:nb_selword(N)}.
