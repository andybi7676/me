import Image from "next/image";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { GithubIcon, GoogleScholarIcon } from "@/app/ui/icons";
import { H1, H2, P } from "@/app/ui/markdown";

export default function Resume() {
  return (
    <div className="flex flex-col justify-start px-2">
      <div className="block md:hidden w-full flex flex-row justify-start py-4 px-4 mb-2">
        <div className="w-32 h-auto">
          <Image
            src="/cat_selfie.jpg"
            width={2100}
            height={2400}
            className="rounded-lg"
            alt="My cat's selfie."
          />
        </div>
        <div className="flex flex-col justify-between pl-4">
          <div>
            <H1 className="py-1"> Liang-Hsuan (Andy) Tseng</H1>
            <P className="italic font-bold">PhD Student, Speech Processing and Machine Learning Lab, NTU</P>
          </div>
          <div className="flex flex-col mt-2">
            <a href="mailto:andybi7676@gmail.com" className="hover:underline hover:font-bold mx-1"><EnvelopeIcon className="inline-block h-4 w-4 mr-1" />andybi7676@gmail.com</a>
            <div className="flex flex-row">
              <a href="https://github.com/andybi7676" className="hover:underline hover:font-bold mx-1"><GithubIcon className="inline-block h-4 w-4 mr-1" />github</a>
              /
              <a href="https://scholar.google.com/citations?user=8bGnUhQAAAAJ&hl=en" className="hover:underline hover:font-bold mx-1"><GoogleScholarIcon className="inline-block h-4 w-4 mr-1" />google scholar</a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 mb-4">
        <H2 className="text-2xl font-bold">About Me</H2>
        <P className="mt-2">
          Hi, I am Liang-Hsuan (Andy) Tseng, currently a first-year PhD student in the Speech Processing and Machine Learning (SPML) Lab at National Taiwan University (NTU), instructed by Prof. Hung-yi Lee. 
        </P>
        <P className="mt-2">  
          My current research focuses on applied machine learning on speech processing, with topics across unsupervised / self-supervised learning, speech recognition, and spoken language modeling. 
          I have publications on top-tier machine learning and speech processing conferences including NeurIPS, ACL, Interspeech, and SLT. 
        </P>
      </div>
      <div className="w-full px-4 mb-4">
        <H2 className="text-2xl font-bold">News</H2>
        <P className="mt-2">
          - TASTE: Text-Aligned Speech Tokenization and Embedding for Spoken Language Modeling is on arXiv.
        </P>
        <P className="mt-2">
          - REBORN: Reinforcement-Learned Boundary Segmentation with Iterative Training for Unsupervised ASR is accepted at NeurIPS 2024.
        </P>
      </div>
    </div>
  );
}