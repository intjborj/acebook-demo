import Link from '@/components/ui/link';
import { breadcrumbType } from '@/types/custom';


type Props = {
  data?: Array<breadcrumbType>;
};

type LinkCont = {
  data?: any,
  index?: number,
  children?: JSX.Element,
  hidden?: boolean
}



const BreadcrumbSolidBg = ({ data = [] }: Props) => {

  const LabelContainer = ({ children, hidden }: LinkCont) => (
    <>
      {
        hidden ? <></> : <>{children}</>
      }
    </>

  )

  const LinkContent = ({ data, index }: LinkCont) => {
    return (
      <a
        href="#"
        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {data.isHome ? (
          <svg
            className="mr-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        )}
        <LabelContainer hidden={data?.hidden}>
          {data.isCurrent ? (
            <span className="ml-1 text-sm font-medium text-gray-400 dark:text-gray-500 md:ml-2">
              {data.title}
            </span>
          ) : (
            data.title
          )}
        </LabelContainer>
      </a>
    )
  }

  return (
    <div className="pt-3.5">
      <nav
        className="flex rounded-lg border border-gray-200 bg-gray-50 py-3 px-5 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {data.map((d, index) => (
            <li className="inline-flex items-center" key={index}>
              <Link href={d.route}>
                <LinkContent data={d} index={index} />
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadcrumbSolidBg;
