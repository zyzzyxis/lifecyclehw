class User < ApplicationRecord
    has_many :grades
    has_many :skills, through: :grades

    ## self is the user that called this method
    ## would be better to do this with sql or serillizer but
    ## good model practice

    #instanc method so I call it on the instance of class IE One user
    def get_skills_with_scores
       self.skills.map do |skill|
         #need to figure out how to get the score of the grade
         #grade user_id, skill_id, score
         score = skill.grades.find_by(user_id: self.id).score 
         {skill: skill, score: score}
       end
    end
end
