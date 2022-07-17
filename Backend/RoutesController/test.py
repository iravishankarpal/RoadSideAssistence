rows = 9 
for i in range (1, rows + 1):
  if (i % 2 == 0 and i % 3 == 0):

    for j in range (1, i + 1):
         if (j % 2 == 0):
    	     print ("#", end = "")
	     else :
            print (j, end = "") 
	print ("\n")
