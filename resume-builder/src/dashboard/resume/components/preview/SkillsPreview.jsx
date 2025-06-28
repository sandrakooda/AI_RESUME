function SkillsPreview({ resumeInfo }) {
    // Debugging: Inspect the passed resumeInfo object
    console.log("resumeInfo:", resumeInfo);
  
    return (
      <div className="my-6">
        <h2
          className="text-center font-bold text-sm mb-2"
          style={{
            color: 'white',
          }}
        >
          Skills
        </h2>
        <hr
          style={{
            borderColor: resumeInfo?.themeColor,
          }}
        />
  
        <div className="grid grid-cols-2 gap-3 my-4">
          {resumeInfo?.skills?.map((skill, index) => {
            // Debugging: Inspect each skill object
            console.log(`Skill ${index}:`, skill);
            console.log(Math.min(skill.rating * 20, 100) + "%");
            
  
            // Fallback for invalid rating
            const rating = skill?.rating ?? 0;
  
            return (
              <div key={index} className="flex items-center justify-between">
                <h2 className="text-xs">{skill?.name ?? "Unnamed Skill"}</h2>
                <div className="h-2 bg-gray-200 w-[120px] rounded-full">
                  <div
                    className={`h-2 bg-green-500 rounded-full`}
                    style={{
                      width: Math.min(skill.rating * 20, 100) + "%", // Max 100%
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default SkillsPreview;
  