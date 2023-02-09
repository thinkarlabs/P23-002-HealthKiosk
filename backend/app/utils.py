from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(str(password))


def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(str(password), hashed_password)
