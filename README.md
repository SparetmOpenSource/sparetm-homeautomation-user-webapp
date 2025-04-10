OpenBridge

Web app to control your devices at home

Deployed Link: [Netlify](https://openbridge.netlify.app)

// eslint-disable-line react-hooks/exhaustive-deps

JSON.stringify() A common use of JSON is to exchange data to/from a web server. When sending data to a web server, the data has to be a string. Convert a JavaScript object into a string with JSON.stringify() .

A common use of JSON is to exchange data to/from a web server. When receiving data from a web server, the data is always a string. Parse the data with JSON.parse() , and the data becomes a JavaScript object.

const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));

localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

onClick={() =>
notificationModeChanged(
notificationMode,
setNotificationMode,
setNotificationModeStatus,
true,
)
}

---

                        const {
        notificationMode,
        setNotificationMode,
        setNotificationModeStatus,
    }: any = useContext(MyContext);

---

    mouse events (MouseEvent): mousedown, mouseup, click, dblclick, mousemove, mouseover, mousewheel, mouseout, contextmenu

touch events (TouchEvent): touchstart, touchmove, touchend, touchcancel
keyboard events (KeyboardEvent): keydown, keypress, keyup
form events: focus, blur, change, submit
window events: scroll, resize, hashchange, load, unload

---

const [color, setColor] = useState<any>(light_colors);
const darkTheme = useContext(ThemeContext);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps


    // const {
    //     notificationMode,
    //     setNotificationMode,
    //     setNotificationModeStatus,
    // }: any = useContext(BackgroundNotification);

    //  onClick={() =>
    //                     notificationModeChanged(
    //                         notificationMode,
    //                         setNotificationMode,
    //                         setNotificationModeStatus,
    //                         true,
    //                     )
    //                 }

     let option = [...Array(10)];



       initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={ { scale: 0.95 }}



      const navigate = useNavigate();


      const darkTheme: any = useTheme();
       displayToastify(
            'The user name or password are incorrect',
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.INFO,
        );



         const formList: Record<string, any> = [
        {
            id: 1,
            formFormat: 'Input',
            type: 'email',
            placeholder: 'Email*',
            keyName: 'email',
            minLength: 3,
            maxLength: 36,
        },
        {
            id: 2,
            formFormat: 'Input',
            type: 'password',
            placeholder: 'Password*',
            keyName: 'password',
            minLength: 3,
            maxLength: 36,
        },
        // {
        //     id: 3,
        //     formFormat: 'Selection',
        //     isMulti: false,
        //     label: 'select user name*',
        //     optionType: 'api',
        //     keyName: 'userName',
        //     option: [],
        //     onChangeFn: addDataFn,
        // },
        // {
        //     id: 4,
        //     formFormat: 'Selection',
        //     isMulti: true,
        //     label: 'select city*',
        //     optionType: 'jsObject',
        //     keyName: 'city',
        //     option: ProfileConfigRoomNames,
        //     onChangeFn: addDataFn,
        // },
    ];


    ---------

      const {
        toggleBackDropOpen,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();




     onClick={() => {
                            toggleBackDropOpen();
                            setChildForCustomBackDrop(
                                <Confirmation darkTheme={darkTheme} />,
                            );
                            setSizeForCustomBackDrop(sizeM);
                        }}


                        ----------

                         onClick={() => {
                            toggleBackDropOpen();
                            setChildForCustomBackDrop(
                                <Confirmation darkTheme={darkTheme} />,
                            );
                            setSizeForCustomBackDrop(horizontalSize);
                        }}


                            const {
        toggleBackDropOpen,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();




    ---------------

         displayToastify(
            'The user name or password are incorrect',
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );

        ----------

         // const profile = useAppSelector((state: any) => state?.user?.profile);
    // const dispatch = useAppDispatch();
    // dispatch(addProfile('shubham'))

    --
    <Outlet context={[data]}
    const ColorValue: any = useOutletContext();


    An error occurred. Please try again

    // let option = [...Array(23)];

    const handleColorNotificationChange = useColorNotification();
     handleColorNotificationChange(colorNotificationStatus[1]);

        <button onClick={() => dispatch(addProfile('shubham'))}>
                            Add profile
        </button>

// <CalenderFrame setNewDate={setDateValue} />
// const [dataValue, setDataValue]: any = useState();

const queryClient = useQueryClient();
const queryKeys = [SELECT_WEATHER_QUOTE_QUERY_ID];
onClick={() => invalidateQueries(queryClient, queryKeys)}

    // console.log(mqttCred?.data?.body);
    // let deviceData = [...Array(20)];


    `${color?.button.split(')')[0]},0.2)`

    if (Object.keys(notificationData).length !== 0) {}

    -----------------------------------------------------

    const {
    toggleBackDropOpen,
    toggleBackDropClose,

} = useBackDropOpen();

//--//

onClick={() => {
const backdropId = "confirmationModal"; // Unique ID for this backdrop

    props?.toggleBackDropOpen(
        backdropId,
        <Confirmation
            darkTheme={darkTheme}
            heading={props?.profileBtnHeading}
            btnOkFn={() => {
                props?.toggleBackDropClose(backdropId);
                logoutProfileOnClick(dispatch, queryClient, navigate);
            }}
            btnCancelFn={() => props?.toggleBackDropClose(backdropId)}
            btnOkLabel={props?.profileBtnOkLabel}
            btnCancelLabel="Cancel"
        />,
        LandscapeSizeS
    );

}}
