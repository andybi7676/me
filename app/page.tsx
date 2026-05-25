import Image from 'next/image';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Banner from '@/app/ui/banner';
import Experience from '@/app/ui/experience';
import Publications from '@/app/ui/publications';
import { GithubIcon, GoogleScholarIcon } from '@/app/ui/icons';
import { loadPublications } from '@/app/lib/publications';

export default function Page() {
  const pubs = loadPublications();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Banner />

      <main className="w-full md:max-w-[50vw] mx-auto px-4 sm:px-6 py-10">

        {/* About */}
        <section id="about" className="mb-14">
          <div className="flex flex-col sm:flex-row">

            {/* Left: photo + name */}
            <div className="flex-shrink-0 sm:w-[25%] sm:pr-4">
              <div className="w-36 sm:w-full mx-auto sm:mx-0 rounded-xl overflow-hidden">
                <Image
                  src="/selfie_01.jpg"
                  width={2268}
                  height={2268}
                  alt="Liang-Hsuan Tseng"
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="mt-3 text-center sm:text-left">
                <p className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                  Liang-Hsuan (Andy) Tseng
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">曾亮軒</p>
                <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-0.5">
                  Ph.D. Student · SPML Lab, NTU
                </p>
              </div>
            </div>

            {/* Right: intro + links */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed text-[0.95rem]">
                <p>
                  I am a second-year Ph.D. student at the{' '}
                  <strong className="text-gray-900 dark:text-white">
                    Speech Processing and Machine Learning (SPML) Laboratory
                  </strong>{' '}
                  of National Taiwan University, advised by{' '}
                  <a
                    href="https://speech.ee.ntu.edu.tw/~hylee/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Prof. Hung-yi Lee
                  </a>.
                </p>
                <p>
                  My research primarily focuses on{' '}
                  <strong className="text-gray-900 dark:text-white">speech processing</strong> and{' '}
                  <strong className="text-gray-900 dark:text-white">applied machine learning</strong>,
                  with particular interests in automatic speech recognition and spoken language modeling.
                  I have developed a subtitle generator system that automatically transcribes lecture
                  recordings for the entire university, significantly improving accessibility in education.
                </p>
                <p>
                  Recently, I have been working on{' '}
                  <strong className="text-gray-900 dark:text-white">spoken language modeling</strong>,
                  with the aim of developing intelligent and high-fidelity speech generative models.
                </p>
              </div>

              {/* Links */}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                <a
                  href="mailto:andybi7676@gmail.com"
                  className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <EnvelopeIcon className="h-3.5 w-3.5 flex-shrink-0" />
                  andybi7676@gmail.com
                </a>
                <a
                  href="https://github.com/andybi7676"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <GithubIcon className="h-3.5 w-3.5 flex-shrink-0" />
                  GitHub
                </a>
                <a
                  href="https://scholar.google.com/citations?user=8bGnUhQAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <GoogleScholarIcon className="h-3.5 w-3.5 flex-shrink-0" />
                  Google Scholar
                </a>
              </div>
            </div>
          </div>
        </section>

        <Experience />
        <Publications pubs={pubs} />

      </main>
    </div>
  );
}
