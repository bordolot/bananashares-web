
// import { FaInstagram, } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { FaDiscord } from 'react-icons/fa6';

// const sections = [
//     {
//         title: 'Solutions',
//         items: ['Marketing', 'Analytics', 'Commerce', 'Data', 'Cloud']
//     },
//     {
//         title: 'Support',
//         items: ['Pricing', 'Documentation', 'Guides', 'API', 'Status']
//     },
//     {
//         title: 'Company',
//         items: ['About', 'Blog', 'Jobs', 'Press', 'Partners']
//     },
//     {
//         title: 'Legal',
//         items: ['Claims', 'Privacy', 'Terms', 'Policies', 'Conditions']
//     }
// ]

// const items = [
//     {
//         name: 'Twitter',
//         icon: FaDiscord,
//         link: 'https://x.com/S_M_place'
//     },
//     // {
//     //     name: 'Instagram',
//     //     icon: FaInstagram,
//     //     link: 'https://www.instagram.com/s_m_place/'
//     // }
// ]


const Footer = () => {
    return (
        <>
            {/* fixed */}
            {/* <div className="w-full bg-slate-900 text-gray-300 py-y px-2 bottom-0"> */}
            <div className="w-full bg-green-600 text-gray-300 py-y px-2 bottom-0">
                <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">

                    <div className='col-span-2 pt-8 md:pt-2'>
                        <p className='text-5xl w-full font-bold text-yellow-400 pb-5'>
                            Bananashares
                        </p>
                        {/* <div className='flex justify-between sm:w-[70px] pt-4 text-2xl'>
                            {items.map((x, index) => (
                                <a href={x.link} target="_blank" rel="noopener noreferrer" key={index}>
                                    <x.icon className='hover:text-white cursor-pointer' />
                                </a>
                            ))}
                        </div> */}
                    </div>

                </div>

                <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between
                    sm:flex-row text-yellow-400'>
                    <p className='pt-2 text-xs'>
                        DISCLAIMER: BananaShares is a technology services provider. Use of the BananaShares Protocol involves risks, including but not limited to the potential loss of digital assets. Before using the BananaShares Protocol, you should review our documentation to ensure you understand how the Protocol works. As described in our Terms, the BananaShares Protocol is provided on an “as is” and “as available” basis, at your own risk. We explicitly disclaim any representation or warranties of any kind relating to the Protocol, and no developer or entity will be liable for claims or damages of any kind associated with use or inability to use the Protocol.
                    </p>
                </div>
                <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between
                    sm:flex-row text-center text-yellow-400'>
                    <p className='py-2'>
                        Copyright © Bananashares 2025
                    </p>
                </div>
            </div>
        </>
    );
};





export default Footer;