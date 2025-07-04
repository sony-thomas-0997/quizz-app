type  questionvaluetypes =[{
 id: number,
        question : string, 
        Difficulty: string,
        
        options: {
          optionA: string|number,
          optionB: string|number,
          optionC: string|number,
          optionD: string|number,
          Rightanswer: string|number
          }
}]

export{type questionvaluetypes};