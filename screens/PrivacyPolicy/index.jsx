import { useContext, useEffect } from 'react';
import { AppContext } from '../../util/contextItem.jsx';

const RenderPrivacyPolicy = props => {
    const {
        siteTitle
    } = useContext(AppContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div
            class="w-full h-full bg-[#E5E5E5] py-10"
        >
            <div class="[&>h1]:text-3xl [&>h2]:text-2xl [&>h2]:mt-5 [&>p]:text-base [&>ul]:text-2xl [&>ul>li]:text-base text-[#333333] w-11/12 mx-auto sm:w-8/12 lg:w-5/12">
                <h1>Privacy Policy for {siteTitle}</h1>
                <p>At {siteTitle}, we are committed to protecting the privacy and personal information of our users. This privacy policy explains how we collect, use, and disclose information about you when you use our social media platform.</p>
                <h2>1. Information we collect</h2>
                <p>When you use {siteTitle}, we may collect the following types of information:</p>
                <ul>
                    <li>Personal information: When you create an account, we may collect your name, email address, and other contact information. We may also collect your date of birth, gender, and other demographic information.</li>
                    <li>Content: We may collect the content you post on our platform, including messages, comments, photos, and videos.</li>
                    <li>Usage data: We may collect information about how you use our platform, including your interactions with other users, your search queries, and the content you view.</li>
                    <li>Device information: We may collect information about the device you use to access our platform, including the type of device, operating system, and browser you use.</li>
                    <li>Location data: We may collect your location data if you give us permission to do so.</li>
                </ul>
                <h2>2. How we use your information</h2>
                <p>We use the information we collect from you to provide and improve our social media platform, including:</p>
                <ul>
                    <li>To personalize your experience on our platform.</li>
                    <li>To communicate with you about your account and our services.</li>
                    <li>To provide customer support.</li>
                    <li>To understand how our users use our platform.</li>
                    <li>To improve our platform and develop new features.</li>
                    <li>To comply with legal obligations.</li>
                </ul>
                <h2>3. How we share your information</h2>
                <p>We may share your information with third parties in the following circumstances:</p>
                <ul>
                    <li>With service providers who help us operate and maintain our platform.</li>
                    <li>With other users of our platform in accordance with your privacy settings.</li>
                    <li>In response to a legal request, such as a subpoena or court order.</li>
                    <li>To protect the rights, property, or safety of {siteTitle}, our users, or others.</li>
                    <li>In connection with a merger, acquisition, or sale of all or a portion of our assets.</li>
                </ul>
                <h2>4. Your choices</h2>
                <p>You can choose not to provide certain information to us, although this may limit your ability to use certain features of our platform. You can also control who sees your content and personal information through your privacy settings.</p>
                <h2>5. Security</h2>
                <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure.</p>
                <h2>6. Changes to this policy</h2>
                <p>We may update this privacy policy from time to time. If we make material changes, we will notify you by email or through our platform.</p>
                <h2>7. Contact us</h2>
                <p>If you have any questions or concerns about our privacy policy or our practices, please contact us at <a href="mailto:privacy@henrysspeakeasy.com">privacy@{siteTitle}.com</a></p>
            </div>
        </div>
    )
}

export default RenderPrivacyPolicy; 