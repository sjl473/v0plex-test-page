
import React from 'react';
import { GithubIcon } from 'lucide-react';
import styles from './edit-this-page.module.css';
import Link from '@/components/link';

interface EditThisPageProps {
  githubLink: string;
}

const EditThisPage: React.FC<EditThisPageProps> = ({ githubLink }) => {
  return (
    <div className={styles.editThisPageLink}>
      <Link href={githubLink}>
        Edit this page on GitHub/GitLab
        <GithubIcon size={16} />
      </Link>
    </div>
  );
};

export default EditThisPage;