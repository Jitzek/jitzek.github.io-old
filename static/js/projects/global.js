const pr_info_arr = [
    { id: "", type: 'header', content: '', fg_color: 'white' },
    {
        id: "isala",
        type: 'card',
        content: 'Isala Web Application',
        // TODO: Pills / colour coded
        tags: [
            { value: 'PHP', type: 'lang' },
            { value: 'Database', type: 'service' },
            { value: 'LDAP', type: 'service' },
            { value: 'SMB', type: 'service' },
            { value: 'MVC', type: 'dp' },
            { value: 'Linux', type: 'other' },
            { value: 'Apache', type: 'service' },
            { value: 'VM', type: 'other' }],
        picture: '../static/src/projects/icons/isala.png',
        href: '/projects/isala',
        color: 'white',
        background: 'url(../static/src/projects/isala/isala_background.jpg',
        foreground: 'rgba(39,62,84,1)',
        hover: 'rgba(39,62,84,0.5)',
        glow: '0 0 10px #99ffdd55'
    }
];

function getProjectInfoByID(id) {
    for (let i = 0; i , pr_info_arr.length; i++) {
        if (pr_info_arr[i].id == id) {
            return pr_info_arr[i];
        }
    }
    return null;
}