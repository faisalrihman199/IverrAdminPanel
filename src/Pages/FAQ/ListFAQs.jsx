import React from 'react'
import MainLayout from '../../Components/Layouts/MainLayout'
import DataTable from '../../Components/Tables/DataTable'
import { useAPP } from '../../contexts/Appcontext'

const ListFAQs = () => {
    const { theme } = useAPP();
    const headers = [

      { key: 'question', label: 'Question', isImage: false, sortable: true },
      { key: 'answer', label: 'Answer', isImage: false, sortable: true },
    ]

    const questions = [
      "What is the capital of France?",
      "How does photosynthesis work?",
      "Who wrote 'To Kill a Mockingbird'?",
      "What is the speed of light?",
      "Explain Newton's First Law of Motion.",
      "What are the three states of matter?",
      "Who discovered penicillin?",
      "What is the Pythagorean Theorem?",
      "What causes tides in the ocean?",
      "Define the term 'biodiversity'."
    ];
    
    const answers = [
      "The capital of France is Paris.",
      "Photosynthesis is the process by which green plants use sunlight to synthesize food from carbon dioxide and water. Photosynthesis is the process by which green plants use sunlight to synthesize food from carbon dioxide and water.",
      "'To Kill a Mockingbird' was written by Harper Lee.",
      "The speed of light is approximately 299,792,458 meters per second.",
      "Newton's First Law states that an object in motion stays in motion unless acted upon by an external force.",
      "The three states of matter are solid, liquid, and gas.",
      "Penicillin was discovered by Alexander Fleming in 1928.",
      "The Pythagorean Theorem states that in a right triangle, a² + b² = c².",
      "Tides are caused by the gravitational pull of the moon and the sun.",
      "Biodiversity refers to the variety of life in the world or a particular ecosystem."
    ];
    
    const data = Array.from({ length: 150 }, (_, i) => {
      const id = i + 1;
      const statuses = ["publish", "Draft"];
      const question = questions[Math.floor(Math.random() * questions.length)];
      const answer = answers[Math.floor(Math.random() * answers.length)];
      const status = statuses[id % statuses.length];
      
      return { id, question, answer, status };
    });
    return (
        <MainLayout>
            <section>
                <h1 className={`font-semibold mb-4 ${theme == 'dark' ? 'text-white' : 'color-2b'}`} style={{ fontSize: '24px' }}>FAQs List Management
                </h1>
                <DataTable headers={headers} data={data} />
            </section>

        </MainLayout>
    )
}

export default ListFAQs