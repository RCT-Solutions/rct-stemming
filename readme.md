#Stemming Helper
This module will make available word stemming algorithm.  It will handle English to start with.

#Installation Instructions.


#Martin Porter Stemming Algorithm

A consonant is a letter or word other then AEIOU and Y under specific conditions.
A vowel is a non-consonant letter.

denoted letters

1.  c = consonant
1.  v = vowel
1.  m = measure
1.  C = 0 or more consonants
1.  V = 0 or more vowels
1.  m = 0 is for null words
1.  P1 = Position of start of R1
1.  P2 = Position of start of R2
1.  R1 = Region 1
1.  R2 = Region 2
1.  pV = Position of the shortest acceptable verb stem
1.  *d = Double letters where d is the letter i.e. *L = ll

1.  *(condition) S1 -> S2
1.  *(m > 1) EMENT ->

##Condition

1.  *S   - the stem ends with S (and similarly for the other letters).
1.  *v*  - the stem contains a vowel
1.  *d   - the stem ends with a double consonant (e.g. -TT, -SS)
1.  *o   - the stem ends cvc where the second c is not W, X or Y (e.g. -WIL -HOP)

Condition may contain \and\, \or\, and \not\ operators

( m>1 and (*S or *T))

All rules are processed and the one with the longest result is used.

#Calculating measure (m)
m is the number of word parts detected before applying the rule.

    [C](VC)m[V]

Basically its the number of (VC) in the a word based on the formula above.

So for crepuscular would have a measure of 4.


    c   r   e   p   u   s   c   u   l   a   r
             
    C   C   V   C   V   C   C   V   C   V   C
   
              1       2           3       4
              
There are only really 2 tests in Porter stemmer m > 0 and m > 1, so the interesting point is m = 1.
              
m > 0 is true at the point after the first C following V<br/>
m > 1 is true at the point after the first C following V following C following V 

              
    c   r   e   p   u   s   c   u   l   a   r
             
    C   C   V   C   V   C   C   V   C   V   C
                   P1      P2
                   <------------ R1 -------->
                           <------- R2 ----->
                            
P1 and P2 are fixed in the word and should not move.

The above is only true for English.  For other latin languages the positions of P1 and P2 will vary because the of the 
definition of vowels and consonants.

Take the word inquiétude in French, the i preceded and followed by a vowel should 
be treated as a consonant.  

    i   n   q   u   i    é   t   u   d   e
       
    V   C   C   V   C    V   C   C   C   V   

Take the word São João in Portuguese ã and õ should be treated as a vowel-consonant pair.

    S   ã   o   J   o    ã   o
    
    C   VC  V   C   V    VC  V
    
pV is not used explicitly in Port Stemmer, but the idea used when the verb endings 'ing' and 'ed' are removed only when 
preceded by a vowel.  In English therefore pV would be defined as the position after the first vowel.    

    e   n   d   i   n   g
    
    V   C   C   V   C   C
      
      pV  
      
      
##Steps
There are 5 main steps which are broken down even more.
        
###Step 1a
remove the i-suffixes.

<b>Rules</b>

1.  sses (<-'ss')       caresses -> caress
1.  ies (<-'i')         ponies -> poni
1.  ss ()               caress -> caress
1.  s (delete)          cats -> cat
     
<b>IMPORTANT</b> 

    Scan the word from right to left
    delete is just replace with empty string ''
        
###Step 1b
this is a really tricky part.
        
<b>Rules</b>

1.  EED (R1 <- 'EE')
1.  ED  (*v*)   conflated -> conflat sized -> siz tanned -> tann
1.  ING (*v*)   troubling -> troubl hopping -> hopp falling -> fall failing -> fail filing -> fil

If the second or third rule is successful then do the following

1.  ATE (<-'AT')  conflat -> conflate
1.  BLE (<-'BL')  troubl -> trouble
1.  IZE (<-'IZ')  siz -> size
1.  ((*d and not (*L or *S or *Z)) -> single letter) hopp -> hop tann-> tan fall -> fall
1.  (m=1 and *o) ->     fail -> fail fil -> file

###Step 1c

<b>Rules</b>

1. (*v*)Y -> I   happy -> happi
                 sky -> sky
                 
###Step 2
A quick check is to test the second to last character of the word for the following letters

acelost 

If found then do the following rules, else skip to Step 3.

Those words ending in i have been modified by Step 1c

<b>Rules</b>

1.  (m>0) ATIONAL -> ATE    relational -> relate
1.  (m>0) TIONAL -> TION    conditional -> condition rational -> rational(?)
1.  (m>0) ENCI -> ENCE      valenci -> valence
1.  (m>0) ANCI -> ANCE      hesitanci -> hesitance
1.  (m>0) IZER -> IZE       digitizer -> digitize
1.  (m>0) ABLI -> ABLE      conformabli -> conformable
1.  (m>0) ALLI -> AL        radicalli -> radical
1.  (m>0) ENTLI -> ENT      differentli -> different
1.  (m>0) ELI -> E          vileli -> vile
1.  (m>0) OUSLI -> OUS      analogousli -> analogous
1.  (m>0) IZATION -> IZE    vietnamization -> vietnamize
1.  (m>0) ATION -> ATE      predication -> predicate
1.  (m>0) ATOR -> ATE       operator -> operate
1.  (m>0) ALISM -> AL       feudalism -> feudal
1.  (m>0) IVENESS -> IVE    decisiveness -> decisive
1.  (m>0) FULNESS -> FUL    hopefulness	-> hopeful
1.  (m>0) OUSNESS -> OUS	callousness	-> callous
1.  (m>0) ALITI	-> AL 		formaliti -> formal
1.  (m>0) IVITI	-> IVE		sensitiviti	-> sensitive
1.  (m>0) BILITI ->	BLE		sensibiliti	-> sensible

###Step 3
A quick check is to test the last character of the word for the following letters

eils

<b>Rules</b>

1.  (m>0) ICATE	-> IC 		triplicate -> triplic
1.  (m>0) ATIVE ->    		formative -> form
1.  (m>0) ALIZE	-> AL  		formalize -> formal
1.  (m>0) ICITI	-> IC  		electriciti	-> electric
1.  (m>0) ICAL -> IC   		electrical -> electric
1.  (m>0) FUL ->     		hopeful	-> hope
1.  (m>0) NESS ->    		goodness ->	good


