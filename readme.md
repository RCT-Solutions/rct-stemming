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

1.  m = 0 for TR, EE, TREE, Y, BY.
1.  m = 1 for TROUBLE, OATS, TREES, IVY.
1.  m = 2 for TROUBLES, PRIVATE, OATEN, ORRERY.

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

