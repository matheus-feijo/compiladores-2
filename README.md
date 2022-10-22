### Sintatico

* FIRST <programa> = {program ident}
* FIRST <corpo> = {real, integer}
* FIRST <dc> = {real, integer}
* FIRST <mais_dc> = { ;, e }
* FIRST <dc_v> = { real, integer }
* FIRST <tipo_var> = { real, integer}
* FIRST <variaveis> = { ident }
* FIRST <mais_var> = { , }
* FIRST <comandos> = { read(ident), write(ident), ident := }
* FIRST <mais_comandos> = { ; , e }
* FIRST <comando> = { read(ident), write(ident), ident := }
* FIRST <condicao> = { -, e }
* FIRST <relacao> = { = , <> , >= , <= , > , <}
* FISRT <expressao> = { - , e}
* FIRST <termo> = {- ,e }
* FIRST <op_un> = { - , e}
* FIRST <fator> = {ident, numero_int, numero_real, ( }
* FIRST <outros_termos> = {+ , -, e}
* FIRST <op_ad> = { +, -}
* FIRST <mais_fatores> = { * , / , e}
* FIRST <op_mul> = { * , /}
* FIRST <pfalsa> = { else, e}


## REGRA FOLLOW

* 1- A -> Ba => FOLLOW(B) = {a}
* 2- A -> BC => FOLLOW(B) = FIRST(C)
* 3- A -> B => FOLLOW(B) = FOLLOW(A)


* FOLLOW <programa> = { $ } =>> { $ } (feito)
  
* FOLLOW <corpo> = { $ } =>> FOLLOW <programa> (feito)
  
* FOLLOW <dc> = { begin , $} =>> {begin} && FOLLOW <mais_dc> (feito)
  
* FOLLOW <mais_dc> = { begin , $ } =>> FOLLOW <dc> (feito)
  
* FOLLOW <dc_v> = { ; , begin , $ } =>> FIRST <mais_dc> && FOLLOW <dc> (feito)
  
* FOLLOW <tipo_var> = { : } =>> { : } (feito)
  
* FOLLOW <variaveis> = { ; , begin , $ } =>> FOLLOW <dc_v> && FOLLOW <mais_var> (feito)

* FOLLOW <mais_var> = { ; , begin , $ } =>> FOLLOW <variaveis> (feito)
  
* FOLLOW <comandos> = { end , else , ; , $} =>> {end} && FOLLOW <mais_comandos> && FIRST <pfalsa> && { $ } && FOLLOW <pfalsa> &&  FOLLOW <corpo> && FOLLOW <comando> (feito)
  
* FOLLOW <mais_comandos> = { end , else , ; , $ } =>> FOLLOW <comandos> (feito)
  
* FOLLOW <comando> = { ; , end , else , $} =>> FIRST <mais_comandos> && FOLLOW <comandos>  (feito)
  
* FOLLOW <condicao> = {then , do } =>> {then} && { do } (feito)
  
* FOLLOW <relacao> = { - , ; , end , else , $ , then , do , * , / , + , ) , = , <> , <= , >= , < , > } =>> FIRST <expressao> && FOLLOW <comando> && FOLLOW <condicao> && FOLLOW <fator> (feito)
  
* FOLLOW <expressao> = { ) , = , <> , <=, >= , < , > , ; , end , else , then , do , $ } =>> { ) } && FIRST <relacao> && FOLLOW <comando> && FOLLOW <condicao> (feito)
  
* FOLLOW <termo> = { + , - , ) , = , <> , <= , >= , < , > , ; , end ,else , then , do , $ } =>> FIRST <outros_termos> && FOLLOW <expressao> && FOLLOW <outros_termos> (feito)
  
* FOLLOW <op_un> = {ident, numero_int, numero_real, ( } =>> FIRST <fator> (feito)
  
* FOLLOW <fator> = { * , / , + , - , ) , = , <> , <= , >= , < , > , ; , end ,else , then , do , $} =>> FIRST <mais_fatores> && FOLLOW <termo> && FOLLOW <mais_fatores> (feito)
  
* FOLLOW <outros_temos> = { ) , = , <> , <=, >= , < , > , ; , end , else , then , do , $ } =>> FOLLOW <expressao> (feito)
  
* FOLLOW <op_ad> = { - , ) , = , <> , <=, >= , < , > , ; , end , else , then , do , $} =>> FIRST <termo> && FOLLOW <expressao> && FOLLOW <outros_termos> (feito)
  
* FOLLOW <mais_fatores> = { + , - , ) , = , <> , <= , >= , < , > , ; , end ,else , then , do , $ } =>> FOLLOW <termo> (feito)
  
* FOLLOW <op_mul> = {ident, numero_int, numero_real, ( } =>> FIRST <fator> (feito)
  
* FOLLOW <pfalsa> = { $ } =>> { $ } (feito)


