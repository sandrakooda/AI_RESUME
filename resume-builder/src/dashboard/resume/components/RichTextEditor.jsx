import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = 'Based on the position title: "{positionTitle}", generate a concise and professional paragraph for my resume experience. Focus on achievements, responsibilities, and skills relevant to the position. Provide the result in plain text without html tags without including experience levels or JSON formatting just give plain text.';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    

    const GenerateSummeryFromAI = async () => {
        if (!resumeInfo?.experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }
        setLoading(true); 
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

        try {
            const result = await AIChatSession.sendMessage(prompt);
            const text = await result.response.text()// Await here to resolve the promise
            console.log(text); 
            setValue(text);  
        } catch (error) {
            console.error('Error generating AI summary:', error);
            toast('Failed to generate summary.');
        } finally {
            setLoading(false);
        }
    };

    function cleanText(data) {
      try {
          // Assuming `data` contains JSON-like structure that starts and ends with the unwanted parts
          const cleanedData = data
              .replace(/^.*"resume_paragraph":\s*"/, '')  // Remove the first unwanted part
              .replace(/"\s*}\s*$/, '');  // Remove the last unwanted part
          return cleanedData.trim();  // Return the cleaned text
      } catch (error) {
          console.error('Error cleaning the data:', error);
          return '';  // Return empty string in case of error
      }
  }

  

    return (
        <div>
            <div className="flex justify-between my-2">
                <label className="text-xs">Summary</label>
                <Button variant="outline" size="sm"
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary">
                    {loading ? <LoaderCircle className="animate-spin" /> : <>
                        <Brain className="h-4 w-4" /> Generate from AI
                    </>}
                </Button>
            </div>

            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
