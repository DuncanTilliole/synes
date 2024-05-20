export interface ErrorResponse {
  statusCode: number;
  message: string;
}

// Définitions des erreurs réutilisables
export const ERROR_METHOD_NOT_ALLOWED: ErrorResponse = {
  statusCode: 405,
  message: "Method Not Allowed",
};

export const ERROR_USER_ALREADY_EXISTS: ErrorResponse = {
  statusCode: 400,
  message: "Un utilisateur avec cette adresse e-mail existe déjà.",
};

export const ERROR_INTERNAL_SERVER: ErrorResponse = {
  statusCode: 500,
  message: "Une erreur est survenue lors de la création de l'utilisateur.",
};

export const ERROR_INVALID_CREDENTIALS: ErrorResponse = {
  statusCode: 401,
  message: "Email ou mot de passe incorrect.",
};
