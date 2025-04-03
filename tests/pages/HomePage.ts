// home.page.ts
import { test, expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    // Cookies
    readonly cookieDialog: Locator;
    readonly cookieAcceptButton: Locator;
    readonly cookieDeclineButton: Locator;

    // Header/Navigation
    readonly homeLink: Locator;
    readonly aboutLink: Locator;
    readonly servicesLink: Locator;
    readonly caseStudiesLink: Locator;
    readonly labsLink: Locator;
    readonly insightsLink: Locator;
    readonly contactLink: Locator;

    // Hero Section
    readonly heroHeading: Locator;

    // Clients Grid
    readonly clientsGrid: Locator;

    // Impact Section
    readonly impactHeading: Locator;

    // Case Studies
    readonly caseStudiesHeading: Locator;
    readonly seeMoreProjectsLink: Locator;

    // Testimonials
    readonly testimonialsHeading: Locator;
    readonly strategicText: Locator;
    readonly strategicHeading: Locator;

    // Services
    readonly coreServicesHeading: Locator;
    readonly processHeading: Locator;

    // Labs Slider
    readonly labsSlider: Locator;
    readonly labsSlides: Locator;

    // Awards
    readonly awardsHeading: Locator;
    readonly awardsGrid: Locator;
    readonly awardsItems: Locator;
    readonly outcomesHeading: Locator;

    // Press Marquee
    readonly pressMarquee: Locator;

    // Footer
    readonly footer: Locator;
    readonly footerLogo: Locator;

    constructor(page: Page) {
        this.page = page;

        // Cookie Dialog Elements
        this.cookieDialog = page.locator('#CybotCookiebotDialog');
        this.cookieAcceptButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        this.cookieDeclineButton = page.locator('#CybotCookiebotDialogBodyButtonDecline');

        // Header/Navigation
        this.homeLink = page.getByRole('link', { name: 'home' });
        this.aboutLink = page.getByRole('navigation').getByRole('link', { name: 'About Us' });
        this.servicesLink = page.getByRole('link', { name: 'Services', exact: true });
        this.caseStudiesLink = page.getByRole('link', { name: 'Case Studies' });
        this.labsLink = page.getByRole('link', { name: 'Labs R&D' });
        this.insightsLink = page.getByRole('navigation').getByRole('link', { name: 'Insights' });
        this.contactLink = page.getByRole('link', { name: 'Let\'s Talk' });

        // Hero Section
        this.heroHeading = page.getByRole('heading', { name: 'Build Impactful Digital' });

        // Clients Grid
        this.clientsGrid = page.locator('.hp_clients_grid');

        // Impact Section
        this.impactHeading = page.getByRole('heading', { name: 'The Impact' });

        // Case Studies
        this.caseStudiesHeading = page.getByRole('heading', { name: 'Case Studies' });
        this.seeMoreProjectsLink = page.getByRole('link', { name: 'See More Projects' });

        // Testimonials
        this.testimonialsHeading = page.getByRole('heading', { name: 'They trusted us' });
        this.strategicText = page.locator('body').getByText('Strategic & Technical Product Development');
        this.strategicHeading = page.getByRole('heading', { name: 'Strategic & Technical Product' });

        // Services
        this.coreServicesHeading = page.getByRole('heading', { name: 'Core Services' });
        this.processHeading = page.getByRole('heading', { name: 'Our Process' });

        // Labs Slider
        this.labsSlider = page.locator('.hp_labs_slider_h');
        this.labsSlides = page.locator('.swiper-slide.w-dyn-item:visible');

        // Awards
        this.awardsHeading = page.getByRole('heading', { name: 'Awards' });
        this.awardsGrid = page.locator('.award-grid');
        this.awardsItems = page.locator('.award-grid-item');
        this.outcomesHeading = page.getByRole('heading', { name: 'Get Outcomes Faster' });

        // Press Marquee
        this.pressMarquee = page.locator('.marquee-wrapper');

        // Footer
        this.footer = page.locator('.footer.cc-footer');
        this.footerLogo = page.locator('.footer-logo');

    }

    // ========== Header Assertion Methods ==========
    async verifyHeaderLinksVisible() {
        await expect(this.homeLink).toBeVisible();
        await expect(this.aboutLink).toBeVisible();
        await expect(this.servicesLink).toBeVisible();
        await expect(this.caseStudiesLink).toBeVisible();
        await expect(this.labsLink).toBeVisible();
        await expect(this.insightsLink).toBeVisible();
        await expect(this.contactLink).toBeVisible();
    }

    async verifyHeaderLinksText() {
        await expect(this.homeLink).toHaveText('home');
        await expect(this.aboutLink).toHaveText('About Us');
        await expect(this.servicesLink).toHaveText('Services');
        await expect(this.caseStudiesLink).toHaveText('Case Studies');
        await expect(this.labsLink).toHaveText('Labs R&D');
        await expect(this.insightsLink).toHaveText('Insights');
        await expect(this.contactLink).toHaveText("Let's Talk");
    }

    async verifyNavigationWorks() {
        await test.step('Verify About Us navigation', async () => {
            await this.aboutLink.click();
            await expect(this.page).not.toHaveURL('/');
            await this.page.goBack();
        });

        await test.step('Verify Services navigation', async () => {
            await this.servicesLink.click();
            await expect(this.page).not.toHaveURL('/');
            await this.page.goBack();
        });

    }

    async verifyHeaderPersistsAfterReload() {
        await this.servicesLink.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).not.toHaveURL('/');
    }

    async verifyStickyHeader() {
        const header = this.page.locator('header').first();
        const initialBoundingBox = await header.boundingBox();

        if (initialBoundingBox) {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            const scrolledBoundingBox = await header.boundingBox();
            expect(scrolledBoundingBox?.y).toBe(initialBoundingBox.y);
        }
    }

    async navigate() {
        await this.page.goto('/');
        await this.handleCookieDialog();
    }

    async handleCookieDialog() {
        // Wait for cookie dialog to appear (if it does)
        const isDialogVisible = await this.cookieDialog.isVisible().catch(() => false);

        if (isDialogVisible) {
            // Scroll into view just in case it's not visible
            await this.cookieDialog.scrollIntoViewIfNeeded();

            // Either accept or decline cookies based on your test needs
            await this.cookieAcceptButton.click();
            // OR await this.cookieDeclineButton.click();

            // Wait for dialog to disappear
            await this.cookieDialog.waitFor({ state: 'hidden' });
        }
    }

    async verifySlider(count: number) {
        // Wait for slider container to be visible
        await this.labsSlider.first().waitFor({ state: 'visible' });

        // Scroll into view if needed
        await this.labsSlider.first().scrollIntoViewIfNeeded();

        // Wait for exactly N visible slides
        await expect(this.labsSlides).toHaveCount(count, {
            timeout: 10000 // Longer timeout for animations
        });
    }
}