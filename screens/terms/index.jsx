import { useContext, useEffect } from 'react';
import { AppContext } from '../../util/contextItem.jsx';

const RenderTerms = props => {
    const {
        siteTitle
    } = useContext(AppContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div
            class="w-full bg-[#E5E5E5] py-10"
        >
            <div class="[&>h1]:text-3xl [&>h2]:text-2xl [&>h2]:mt-5 [&>p]:text-base [&>ul]:text-2xl [&>ul>li]:text-base text-[#333333] w-11/12 mx-auto sm:w-8/12 lg:w-5/12">
                <h1>{siteTitle} Terms and Conditions</h1>
                <p>Welcome to {siteTitle}, a social media platform where users can connect and share content. By using our platform, you agree to comply with the following terms and conditions:</p>

                <h2>1. User Content</h2>
                <p>You are solely responsible for the content you post on our platform. By posting content, you represent and warrant that you have the right to post such content and that it does not violate any laws or infringe any intellectual property or other rights of any third party. You grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, store, display, reproduce, modify, create derivative works, perform, and distribute your content on our platform.</p>

                <h2>2. User Conduct</h2>
                <p>You agree to use our platform only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, our platform by any third party. You further agree not to:</p>
                <ul>
                    <li>Post any content that is defamatory, obscene, offensive, or promotes or incites violence or hatred;</li>
                    <li>Use our platform to send unsolicited messages or spam;</li>
                    <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
                    <li>Attempt to gain unauthorized access to our platform or any related systems or networks;</li>
                    <li>Interfere with the proper functioning of our platform, including by introducing any viruses, malware, or other harmful code;</li>
                    <li>Collect or harvest any information about our users without their consent.</li>
                </ul>

                <h2>3. Intellectual Property</h2>
                <p>The content on our platform, including text, graphics, logos, images, and software, is protected by intellectual property laws and is the property of {siteTitle} or its licensors. You may not use or reproduce any of the content without our prior written permission.</p>

                <h2>4. Termination</h2>
                <p>We may terminate or suspend your access to our platform at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these terms and conditions.</p>

                <h2>5. Disclaimer of Warranties</h2>
                <p>Our platform is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that our platform will be uninterrupted or error-free, or that any defects will be corrected.</p>

                <h2>6. Limitation of Liability</h2>
                <p>In no event shall {siteTitle}, its directors, officers, employees, or agents, be liable to you or any third party for any damages, including but not limited to direct, indirect, incidental, consequential, special, or punitive damages, arising out of or in connection with your use of our platform</p>   
            </div>
        </div>
    )
}

export default RenderTerms; 