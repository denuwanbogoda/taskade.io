import clsx from "clsx";
import { redirect } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { auth, signIn } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { SignInIcon } from "@/icons";
import { MarketingLayout } from "@/layouts/Marketing";
import { Button, LinkButton } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
}

function Feature({ title, description, className, ...props }: FeatureProps) {
  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      <h4 className={styles.featuresFeatureTitle}>{title}</h4>
      <p className={styles.featuresFeatureDescription}>{description}</p>
    </div>
  );
}

export default async function Index() {
  const session = await auth();

  // If logged in, go to dashboard
  if (session) {
    redirect(DASHBOARD_URL);
  }

  return (
    <MarketingLayout>
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>
            Welcome To&nbsp;Taskade
          </h1>
          <p className={styles.heroLead}>
             The ultimate collaboration app for teams and individuals.
          </p>
        </div>
        <div className={styles.heroActions}>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <Button icon={<SignInIcon />}>Sign in</Button>
          </form>
          <LinkButton
            href="https://nexios.vercel.app"
            target="_blank"
            variant="secondary"
          >
            Nexios Ai
          </LinkButton>
                  </div>
      </Container>
      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <Feature
            description="A powerful workspace for real-time collaboration and task management."
            title="Real-time Collaboration"
          />
          <Feature
            description="Organize your work efficiently with our intuitive project management tools."
            title="Project Management"
          />
          <Feature
            description="Customize your workspace to fit your team's unique workflow."
            title="Customizable Workflows"
          />
          <Feature
            description="Secure authentication with support for multiple providers."
            title="Secure Authentication"
          />
          <Feature
            description="Stay updated with real-time notifications and seamless updates."
            title="Instant Notifications"
          />
        </div>
      </Container>
    </MarketingLayout>
  );
}
