declare global {
  namespace Express {
    interface Request {
      ownerId?: number
    }
  }
}

export {}
