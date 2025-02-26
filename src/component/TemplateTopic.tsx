import React from 'react'

interface TemplateProps {
  topic: string;
  description: string;
}

const TemplateTopic = ({topic, description}: TemplateProps) => {
  const [firstWord, secondWord] = topic.split(' ');
  return (
    <div className="px-14">
      <h3 className='font-bold text-3xl'>{firstWord} <span className='text-orangeStandard'>{secondWord}</span></h3>
      <p className='font-light text-lg w-96'>{description}</p>
      <div className="">
        
      </div>
    </div>
  )
}

export default TemplateTopic;