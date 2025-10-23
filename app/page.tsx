import React from 'react';
// @ts-ignore: CSS module has no type declarations in this project
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.container} role="main">
      <section className={styles.card} aria-labelledby="page-title">
        <h1 id="page-title" className={styles.title}>
          Empowering the Nation
        </h1>
        <h2 className={styles.subtitle}>Website Files Ready</h2>

        <p className={styles.lead}>
          Your standalone HTML, CSS, and JavaScript website files are located in
          the <strong>website</strong> folder:
        </p>

        <ul className={styles.fileList}>
          <li className={styles.fileItem}>
            📄 <code className={styles.filename}>website/index.html</code>
          </li>
          <li className={styles.fileItem}>
            🎨 <code className={styles.filename}>website/styles.css</code>
          </li>
          <li className={styles.fileItem}>
            ⚡ <code className={styles.filename}>website/script.js</code>
          </li>
        </ul>

        <div className={styles.info}>
          <p className={styles.infoText}>
            <strong>To use the website:</strong> Open{' '}
            <code>website/index.html</code> in any web browser. No server
            required!
          </p>
        </div>

        <p className={styles.footerNote}>
          The website includes all features: Home, Courses, Fee Calculator, and
          Contact pages with full functionality.
        </p>
      </section>
    </main>
  );
}
