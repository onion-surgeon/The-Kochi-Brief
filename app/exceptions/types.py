class UserAlreadyActed(Exception):
    def __init__(self, message = "Action already executed before"):
        self.message = message
        super().__init__(message)

class UserNotFound(Exception):
        def __init__(self):
            super().__init__("User not found")

class IncorrectCredentials(Exception):
    def __init__(self):
        super().__init__("Incorrect credentials")

class CooldownException(Exception):
    def __init__(self, seconds:int):
        self.message = f"Kindly wait {seconds//60} minutes, {seconds%60} seconds before trying again."
        super().__init__(self.message)
        
class APIException(Exception):
     def __init__(self, message = "External service error"):
          self.message = message
          super().__init__(self.message)

class TokenException(Exception):
     def __init__(self, message = "Invalid token"):
          self.message = message
          super().__init__(message)



