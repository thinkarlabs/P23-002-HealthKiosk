def f1():
    print("inside f1")

def f2(fun):
    print("inside f2")
    fun()
    def fun3():
        return 5
    return fun3

print(f2(f1))

clo = f2(f1)

print(clo())
