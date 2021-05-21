import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e7dee9;
    padding: .2em;
    color: #33272a;
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.25);
    @media screen and (min-width: 800px) {
        padding-left: 13em;
        padding-right: 13em;
    }
`;

const Left = styled.div`
    padding-left: 1em;
    display: flex;
    gap: 1em;
    align-items: center;
`;

const Right = styled.div`
    padding-right: 1em;
    display: flex;
    gap: .8em;

`

function Footer() {
    return (
        <StyledFooter>
            <Left>
                <p>Made with</p>
                <svg width="25" height="25" id="heart" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="heart">
                        <g id="Group">
                            <path id="Vector" d="M26.8125 10.3594C24.2343 3.42188 15.7968 6.51563 15 9.98438C13.9218 6.28126 5.71872 3.51563 3.18747 10.3594C0.374968 17.9531 14.0156 24.75 15 25.875C15.9843 24.9844 29.625 17.8125 26.8125 10.3594Z" fill="#FF5A79" />
                            <path id="Vector_2" d="M28.125 8.67188C27.8438 7.78125 27.375 6.98438 26.7188 6.32813C26.1094 5.67188 25.3125 5.15625 24.5156 4.82813C24.0938 4.64063 23.6719 4.54687 23.25 4.45312C23.0156 4.40625 22.8281 4.40625 22.5938 4.35938H21.9375L22.5 4.64062L23.0625 4.92188C23.4375 5.10938 23.8125 5.29688 24.1406 5.53125C24.8438 5.95313 25.4531 6.46875 26.0156 7.03125C26.5781 7.59375 27 8.25 27.4219 9C27.6094 9.375 27.7969 9.75 27.9375 10.125C28.0313 10.3125 28.0781 10.5469 28.1719 10.7344L28.4063 11.3438C28.4531 11.1094 28.4531 10.875 28.4531 10.6875C28.4531 10.4531 28.4531 10.2188 28.4063 10.0313C28.3594 9.5625 28.2656 9.09375 28.125 8.67188Z" fill="#FF5A79" />
                            <path id="Vector_3" d="M29.0625 7.40625C29.0156 7.07813 28.9688 6.75 28.875 6.42188C28.6875 5.76562 28.3125 5.15625 27.8438 4.64062C27.375 4.125 26.8125 3.75 26.2031 3.5625C25.875 3.46875 25.5938 3.375 25.2656 3.32812C25.125 3.32812 24.9375 3.28125 24.7969 3.28125C24.6563 3.28125 24.4688 3.28125 24.3281 3.32812C24.4688 3.42187 24.6094 3.46875 24.75 3.5625C24.8437 3.60937 24.9844 3.70313 25.125 3.75C25.4062 3.89063 25.6406 4.03125 25.875 4.21875C26.3438 4.54688 26.8125 4.92188 27.1875 5.29688C27.5625 5.71875 27.8906 6.1875 28.2188 6.70313C28.3594 6.9375 28.5 7.21875 28.6406 7.5C28.6875 7.64063 28.7813 7.78125 28.8281 7.92188C28.875 8.0625 28.9688 8.20312 29.0156 8.39062C29.0625 8.20312 29.0625 8.0625 29.0625 7.875V7.40625Z" fill="#FF5A79" />
                            <path id="Vector_4" d="M2.01563 10.125C2.15625 9.75 2.34375 9.32813 2.53125 9C2.90625 8.25 3.375 7.59375 3.9375 7.03125C4.5 6.46875 5.10938 5.95313 5.8125 5.53125C6.14063 5.29688 6.51563 5.10938 6.89063 4.92188L7.45313 4.64062L8.01563 4.35938H7.35938C7.125 4.35938 6.9375 4.40625 6.70313 4.45312C6.28125 4.54687 5.85938 4.64063 5.4375 4.82813C4.64063 5.15625 3.89063 5.67188 3.28125 6.32813C2.67188 6.98438 2.15625 7.78125 1.875 8.67188C1.73438 9.09375 1.64063 9.5625 1.59375 9.98438C1.54688 10.2188 1.54688 10.4531 1.54688 10.6406C1.54688 10.875 1.54688 11.1094 1.59375 11.2969L1.82813 10.6875C1.875 10.5 1.92188 10.3125 2.01563 10.125Z" fill="#FF5A79" />
                            <path id="Vector_5" d="M2.8125 5.34375C3.1875 4.92187 3.65625 4.54687 4.125 4.21875C4.35938 4.07812 4.64062 3.89062 4.875 3.75C5.01562 3.65625 5.15625 3.60937 5.29688 3.51562C5.4375 3.42187 5.57812 3.375 5.71875 3.28125C5.57812 3.28125 5.39062 3.23438 5.25 3.23438C5.10938 3.23438 4.92188 3.23437 4.78125 3.28125C4.45312 3.32812 4.17188 3.42187 3.84375 3.51562C3.1875 3.79687 2.625 4.17187 2.15625 4.64062C1.6875 5.15625 1.3125 5.76562 1.125 6.42187C1.03125 6.75 0.984375 7.07812 0.9375 7.40625V7.92187C0.9375 8.10937 0.9375 8.25 0.984375 8.4375C1.03125 8.29688 1.125 8.15625 1.17188 7.96875C1.26562 7.78125 1.3125 7.64062 1.40625 7.5C1.54688 7.21875 1.6875 6.9375 1.82813 6.70312C2.10938 6.1875 2.4375 5.71875 2.8125 5.34375Z" fill="#FF5A79" />
                            <path id="Vector_6" d="M3.65625 18.9844L3.60938 19.0781C3.84375 19.7813 4.21875 20.3437 4.59375 20.9062C4.96875 21.4687 5.4375 21.9375 5.90625 22.3594C6.375 22.7813 6.89062 23.2031 7.45312 23.5781C8.01562 23.9531 8.625 24.2344 9.32812 24.4219L9.375 24.3281C8.4375 23.3906 7.5 22.5 6.5625 21.6094C5.57812 20.7656 4.64062 19.8281 3.65625 18.9844Z" fill="#FF5A79" />
                            <path id="Vector_7" d="M1.6875 20.3906L1.64062 20.4844C1.96875 21.2813 2.39062 21.9375 2.85937 22.5469C3.32812 23.1562 3.84375 23.7188 4.40625 24.2344C4.96875 24.75 5.53125 25.2188 6.1875 25.6875C6.84375 26.1094 7.5 26.5312 8.29688 26.7656L8.34375 26.6719C7.26562 25.5938 6.14062 24.5625 5.0625 23.4844C3.9375 22.4531 2.8125 21.375 1.6875 20.3906Z" fill="#FF5A79" />
                            <path id="Vector_8" d="M24.1406 22.3594C24.6094 21.8906 25.0781 21.4219 25.4531 20.9062C25.8281 20.3906 26.2031 19.7813 26.4375 19.0781L26.3906 18.9844C25.4063 19.8281 24.4688 20.7656 23.4844 21.6094C22.5469 22.5 21.6094 23.3906 20.6719 24.3281L20.7188 24.4219C21.4219 24.2344 22.0313 23.9063 22.5938 23.5781C23.1563 23.2031 23.625 22.7813 24.1406 22.3594Z" fill="#FF5A79" />
                            <path id="Vector_9" d="M24.9375 23.4844C23.8594 24.5625 22.7344 25.5938 21.6562 26.6719L21.7031 26.7656C22.5 26.4844 23.1562 26.1094 23.8125 25.6875C24.4687 25.2656 25.0312 24.7969 25.5937 24.2344C26.1562 23.7188 26.6719 23.1562 27.1406 22.5469C27.6094 21.9375 28.0312 21.2813 28.3594 20.4844L28.3125 20.3906C27.1875 21.375 26.0625 22.4531 24.9375 23.4844Z" fill="#FF5A79" />
                        </g>
                    </g>
                </svg>
            </Left>
            <Right>
                <a href="https://github.com/jazzilll/scrum-board">
                    <svg id="github" width="25" height="24" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Github" d="M15.9166 0C13.9468 0 11.9963 0.397619 10.1764 1.17015C8.35649 1.94269 6.7029 3.07501 5.31002 4.50247C2.49698 7.38536 0.916626 11.2954 0.916626 15.3724C0.916626 22.167 5.22163 27.9317 11.1766 29.9762C11.9266 30.0992 12.1666 29.6226 12.1666 29.2076V26.6096C8.01163 27.532 7.12663 24.5497 7.12663 24.5497C6.43663 22.7665 5.46163 22.29 5.46163 22.29C4.09663 21.3369 5.56663 21.3676 5.56663 21.3676C7.06663 21.4752 7.86163 22.951 7.86163 22.951C9.16663 25.2876 11.3716 24.5958 12.2266 24.2269C12.3616 23.2277 12.7516 22.5513 13.1716 22.167C9.84163 21.7827 6.34663 20.4607 6.34663 14.6038C6.34663 12.8974 6.91663 11.5293 7.89163 10.4379C7.74163 10.0536 7.21663 8.45482 8.04163 6.37955C8.04163 6.37955 9.30163 5.96449 12.1666 7.94753C13.3516 7.60934 14.6416 7.44024 15.9166 7.44024C17.1916 7.44024 18.4816 7.60934 19.6666 7.94753C22.5316 5.96449 23.7916 6.37955 23.7916 6.37955C24.6166 8.45482 24.0916 10.0536 23.9416 10.4379C24.9166 11.5293 25.4866 12.8974 25.4866 14.6038C25.4866 20.476 21.9766 21.7673 18.6316 22.1516C19.1716 22.6282 19.6666 23.5659 19.6666 24.9955V29.2076C19.6666 29.6226 19.9066 30.1145 20.6716 29.9762C26.6266 27.9163 30.9166 22.167 30.9166 15.3724C30.9166 13.3537 30.5286 11.3547 29.7748 9.48964C29.021 7.62457 27.9161 5.92993 26.5232 4.50247C25.1303 3.07501 23.4768 1.94269 21.6569 1.17015C19.837 0.397619 17.8865 0 15.9166 0Z" fill="#33272a" />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/atienzajazz/">
                    <svg id="linkedIn" width="25" height="24" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Linked In">
                            <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M0.416626 2.50637C0.416626 1.84164 0.680689 1.20413 1.15072 0.7341C1.62076 0.264066 2.25826 3.34134e-06 2.92299 3.34134e-06H27.9075C28.237 -0.000534684 28.5632 0.0639073 28.8677 0.18964C29.1722 0.315372 29.4489 0.499926 29.682 0.732735C29.915 0.965543 30.0999 1.24204 30.2259 1.54638C30.352 1.85073 30.4168 2.17695 30.4166 2.50637V27.4909C30.417 27.8204 30.3524 28.1467 30.2265 28.4512C30.1006 28.7557 29.9159 29.0324 29.683 29.2654C29.4501 29.4985 29.1735 29.6833 28.8691 29.8093C28.5647 29.9354 28.2384 30.0002 27.9089 30H2.92299C2.59373 30 2.26771 29.9351 1.96353 29.8091C1.65936 29.683 1.383 29.4983 1.15024 29.2654C0.917486 29.0325 0.732897 28.7561 0.60702 28.4518C0.481144 28.1476 0.416447 27.8215 0.416626 27.4923V2.50637ZM12.2912 11.4382H16.3534V13.4782C16.9398 12.3055 18.4398 11.25 20.6939 11.25C25.0153 11.25 26.0394 13.5859 26.0394 17.8718V25.8109H21.6662V18.8482C21.6662 16.4073 21.0798 15.03 19.5907 15.03C17.5248 15.03 16.6657 16.515 16.6657 18.8482V25.8109H12.2912V11.4382ZM4.79117 25.6241H9.16572V11.25H4.79117V25.6227V25.6241ZM9.79163 6.56182C9.79987 6.93637 9.73322 7.3088 9.59559 7.65725C9.45795 8.0057 9.2521 8.32314 8.99012 8.59096C8.72814 8.85877 8.41531 9.07156 8.06997 9.21683C7.72464 9.3621 7.35377 9.43694 6.97913 9.43694C6.60448 9.43694 6.23361 9.3621 5.88828 9.21683C5.54295 9.07156 5.23011 8.85877 4.96813 8.59096C4.70615 8.32314 4.5003 8.0057 4.36266 7.65725C4.22503 7.3088 4.15838 6.93637 4.16663 6.56182C4.18282 5.82662 4.48624 5.12699 5.01192 4.61276C5.53761 4.09852 6.24375 3.81057 6.97913 3.81057C7.7145 3.81057 8.42064 4.09852 8.94633 4.61276C9.47201 5.12699 9.77544 5.82662 9.79163 6.56182Z" fill="#33272a" />
                        </g>
                    </svg>
                </a>
            </Right>
        </StyledFooter >
    );
}


export default Footer;