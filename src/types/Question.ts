export interface Question {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    mediaUrl: string,
    mediaType: string,
    correctAnswer: string,
    answers: [
      {
        id: number,
        content: string,
        createdAt: number,
        correct: boolean
      }
    ]
}