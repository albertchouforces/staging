interface FooterProps {
  className?: string;
  linkClassName?: string;
}

export function Footer({
  className = "",
  linkClassName = "text-blue-600 hover:text-blue-800 hover:underline transition-colors"
}: FooterProps) {
  return (
    <footer className={`w-full py-4 text-center text-sm text-gray-500 ${className}`}>
      (Version 3.0)<br></br>
      Product of the NTG HQ Learning Support Centre. For more information please contact the Learning Support Centre Product Development Lead (Pacific) at{' '}
      <a 
        href="mailto:joshua.hawthorne@ecn.forces.gc.ca"
        className={linkClassName}
      >
        joshua.hawthorne@ecn.forces.gc.ca
      </a>
    </footer>
  );
}
