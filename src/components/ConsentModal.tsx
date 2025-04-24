import React from 'react';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function ConsentModal({ isOpen, onAccept, onDecline }: ConsentModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Imagining Education Futures: Designing the Education of the Future
          </h2>
          
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">Purpose and Invitation to Participate</h3>
          <p className="mb-4">
            The purpose of this research project is to examine the potential of using speculative storywriting to explore the long-term impact of artificial intelligence (AI) and of other technologies on future education contexts. Writing speculative stories helps us build alternative, (un)wanted education spaces or scenarios, offering insights that can inform present decisions and outlooks.
          </p>
          <p className="mb-6">
            You are invited to participate by contributing your own speculative story. Your participation will help us better understand various visions of future learning environments shaped by AI.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">Project Methodology and Specifications</h3>
          <p className="mb-6">
            As part of this project, you will use a digital interactive scenario generator tool. Upon agreeing to participate, you will be prompted to generate four distinct elements from a digital card deck. These elements form the basis for a speculative story, which you will write in the space provided within the tool. You may also find prompts, examples, and guiding questions to support your writing process.
          </p>
          <p className="mb-6">
            After completing your story, you will have the option to "submit" it to a connected form. This form will also include fields for demographic information, such as your occupation, subject field, and country, as well as an optional email address field.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">Information Collection</h3>
          <p className="mb-2">Within this research project, we will collect and register the following:</p>
          <ul className="list-disc pl-8 mb-6">
            <li className="mb-2">Written/generated story: The story you create is stored separately and will not be connected to any identifying personal information (unless you choose to provide such information in the form).</li>
            <li className="mb-2">Email address (optional): Only if you choose to provide it.</li>
            <li className="mb-2">Occupation, subject field, and country: General demographic information that helps us gauge the audience using the tool.</li>
          </ul>
          <p className="mb-6">
            The submitted stories and your feedback will be analyzed as part of the research project. Portions of these stories may also be cited or discussed in research publications and presentations, or used in subsequent focus groups or workshop discussions. However, no identifying information will be included in such discussions.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">Voluntary Participation and Data Protection</h3>
          <p className="mb-6">
            Your participation in this study is completely voluntary. You may discontinue your participation at any point without providing a reason. Only authorized research team members will have access to data submitted through this project.
          </p>
          <p className="mb-6">
            No data will be shared beyond the immediate research team.
          </p>
          <p className="mb-6">
            We process your personal data on the basis of your consent, in accordance with Article 6(1)(a) of the GDPR, and (if applicable) for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes under Article 9(2)(j).
          </p>
          <p className="mb-6">
            Kungliga Tekniska högskolan (KTH) in Stockholm, Sweden, is the entity responsible for your personal information. When the project concludes, the data collected and generated within the project will be securely stored for archival purposes for at least 5 years.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">Concerning Your Rights to Your Data</h3>
          <p className="mb-2">
            In line with EU data protection regulations (GDPR) and relevant national legislation, you have the right to:
          </p>
          <ul className="list-disc pl-8 mb-6">
            <li className="mb-2">Withdraw your consent without affecting the lawfulness of data processing already carried out before withdrawal.</li>
            <li className="mb-2">Request access to your personal data.</li>
            <li className="mb-2">Have your personal data corrected.</li>
            <li className="mb-2">Have your personal data deleted.</li>
            <li className="mb-2">Have the processing of your personal data restricted.</li>
          </ul>
          <p className="mb-6">
            Please note these rights can be limited under certain circumstances, such as confidentiality requirements or archival regulations.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">Data Protection and Complaints</h3>
          <p className="mb-6">
            If you have questions about how your data is handled or wish to exercise any of your data protection rights, you may contact:
          </p>
          <p className="mb-6">
            KTH Data Protection Officer (DPO): dataskyddsombud@kth.se
          </p>
          <p className="mb-6">
            You also have the right to lodge a complaint with the Swedish Privacy Protection Agency (imy.se).
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">Project Responsibility and Contact Information</h3>
          <p className="mb-2">Project Responsible (Researcher): gidiotis@kth.se</p>
          <p className="mb-2">Principal Research Supervisor: stefanhr@kth.se</p>
          <p className="mb-6">Mailing Address: BRINELLVÄGEN 68, 10044 STOCKHOLM, SWEDEN</p>
          <p className="mb-6">
            Note: Should you wish, you may request a summary of the study's findings once the research is completed by contacting the Project Responsible.
          </p>
          
          <div className="flex justify-center space-x-4 mt-8">
            <button 
              onClick={onDecline}
              className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
            >
              Decline
            </button>
            <button 
              onClick={onAccept}
              className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
            >
              I Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 