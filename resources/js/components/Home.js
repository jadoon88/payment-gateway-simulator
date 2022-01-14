import React, {useEffect, useCallback, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/build/esm/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
//import {AppProvider, Avatar, ResourceList, TextStyle, Navigation,  Page, Card, Button} from '@shopify/polaris';
import {AppProvider, Image, DataTable, Heading, ButtonGroup, Button, Badge, Stack, ActionList, Avatar, Card, ContextualSaveBar, FormLayout, Frame, Layout, Loading, Modal, Navigation, Page, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer, TextField, Toast, TopBar} from '@shopify/polaris';
import {ArrowLeftMinor, ConversationMinor, HomeMajor, OrdersMajor} from '@shopify/polaris-icons';
  

function Home() {
  
  const defaultState = useRef({
    emailFieldValue: 'dharma@jadedpixel.com',
    nameFieldValue: 'Allie Cupcakery',
  });

  const [orderRows, setOrderRows] = useState( [] );
  const [homePage, setHomePage] = useState( loadingMarkup );
  const [currentPage, setCurrentPage] = useState( "actual" );
  const [paymentGateways, setPaymentGateways ] = useState({});
  const [newPaymentGatewayTitle, setNewPaymentGatewayTitle ] = useState();
  const [newPaymentGatewayRatio, setNewPaymentGatewayRatio ] = useState();
  const [isAddingPaymentGateway, setIsAddingPaymentGateway ] = useState(false);
  
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue,
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue,
  );
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue,
  );
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  const handleNewTitleChange = useCallback(
    (value) => setNewPaymentGatewayTitle(value),
    [],
  );
  const handleNewRatioChange = useCallback(
    (value) => setNewPaymentGatewayRatio(value),
    [],
  );
  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;

    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);
  const handleNameFieldChange = useCallback((value) => {
    setNameFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleEmailFieldChange = useCallback((value) => {
    setEmailFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue('');
  }, []);
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    [],
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [],
  );
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    [],
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    {
      items: [{content: 'Community forums'}],
    },
  ];

  useEffect(() => {
    // Update the document title using the browser API
    console.log("page loaded");
    document.title = "Orders Simulation";
    loadOrders();
  },[]);

  const addPaymentGateway = async (id) => {
        
    //setIsLoading(true);
    console.log("Adding Payment Gateway");
    setIsAddingPaymentGateway(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", newPaymentGatewayTitle);
    urlencoded.append("ratio", newPaymentGatewayRatio);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost/api/gateways", requestOptions)
    .then((response) => response.json())
    .then((json) => {
       
      toggleModalActive();
      setIsAddingPaymentGateway(false);
      setNewPaymentGatewayTitle("");
      setNewPaymentGatewayRatio("");
      loadPaymentGatewayPage();
      console.log(json);

  })  }

  const deletePaymentGateway = async (id) => {
        
    //setIsLoading(true);
    console.log("Adding Payment Gateway:".id);
    

    return;
    //setIsAddingPaymentGateway(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost/api/gateways/".id, requestOptions)
    .then((response) => response.json())
    .then((json) => { 
      loadPaymentGatewayPage();
      console.log(json);

  })  }

  const loadPaymentGatewayPage = async (id) => {
        
    setIsLoading(true);
    console.log("Loading Payment Gateway page");
    
    const response = await fetch("http://localhost/api/gateways",
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     "event_id": id
        //   })
      }
    
    ).then((response) => response.json())
    .then((json) => {
       
        //setEvents([...events, json]);
        console.log(json);
        setPaymentGateways(json);
  
        setIsLoading(false);
        setCurrentPage("settings");
        //getEventsWithFetch();

  })      
  }; 

  

  const loadOrders = async (id) => {
    
    //setCurrentPageMarkup(loadingPageMarkup);
    console.log("Loading Order page");
    setIsLoading(true);
    const response = await fetch("http://localhost/api/orders-desc",
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },

      }
    
    ).then((response) => response.json())
    .then((json) => {

      const rows = [];
        for(var k in json.data) {
          //console.log(k, json.data[k]);
          var id=json.data[k].id;
          var customer_name=json.data[k].customer_name;
          var shipping_address=json.data[k].shipping_address;
          var shipping_city=json.data[k].shipping_city;
          var shipping_country=json.data[k].shipping_country;
          var payment_gateway=json.data[k].payment_gateway;
          rows.push([id, customer_name, shipping_city,shipping_country,payment_gateway]);
       }
       console.log(rows);
       setOrderRows(rows);
       setCurrentPage("actual");
       //setHomePage(actualPageMarkup);

       if (rows.length == 0)
      {
        setHomePage(noOrdersPageMarkup);
        setIsLoading(false);
      }
      else
      {
        setOrderRows(rows);
        setHomePage(actualPageMarkup);
        setIsLoading(false);
      }
      
       

  })      
  };  

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Anne Well Max"
      detail={storeName}
      //initials="A"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      //searchResultsVisible={searchActive}
      //searchField={searchFieldMarkup}
      //searchResults={searchResultsMarkup}
      //onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        
        title="Vimble"
        items={[
          {
            label: 'Orders',
            icon: HomeMajor,
            onClick: loadOrders,
          },
          {
            label: 'Payment Gateways',
            icon: OrdersMajor,
            onClick: loadPaymentGatewayPage,
          },
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: 'Contact support',
          onClick: toggleModalActive,
        }}
      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;

  const skipToContentTarget = (
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  );



  const createOrder = async (id) => {
    
    //setCurrentPageMarkup(loadingPageMarkup);
    console.log("Loading Order page");
    setIsLoading(true);
    
    
    const response = await fetch("http://localhost/api/fake-order",
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },

      }
    
    ).then((response) => response.json())
    .then((json) => {

      loadOrders();

    })      
  }; 

  const deleteAllOrders = async (id) => {
    
    //setCurrentPageMarkup(loadingPageMarkup);
    console.log("Loading Order page");
    setIsLoading(true);
    
    
    const response = await fetch("http://localhost/api/drop-orders",
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },

      }
    
    ).then((response) =>{
      loadOrders();
    })      
  }; 

  const noOrdersPageMarkup = (

    <Page title="Orders">
         <Layout>
          <Layout.Section>
          <Card
              primaryFooterAction={{content: 'Create Order', onAction: createOrder}}
            >
          <Card.Section flush>
            <Image
              source="https://polaris.shopify.com/bundles/bc7087219578918d62ac40bf4b4f99ce.png"
              alt="turtle illustration centered with body text and a button"
            />
          </Card.Section>
          <Card.Section subdued>
            <TextContainer>
              You can start the simulation by creating an order
            </TextContainer>
          </Card.Section>
        </Card>
          </Layout.Section>
      </Layout>
        </Page>
  );

  const actualPageMarkup = (
    <Page title="Orders" primaryAction={{content: 'Create New Order', onAction: createOrder}} secondaryActions={[{content: 'Delete All Orders', onAction: deleteAllOrders}]}>
         <Layout>
          <Layout.Section>
          
          <Card>
          
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
              'text',
            ]}
            headings={[
              'Id',
              'Customer Name',
              'City',
              'Country',
              'Payment Gateway',
              
              
            ]}
      
            rows={orderRows}
            
          />
        </Card>
          </Layout.Section>
      </Layout>
        </Page>
  );

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );

  function handlePaymentMethodDelete(id)
  {
    console.log(id);

    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = fetch("http://localhost/api/gateways/"+id, requestOptions)
    .then((response) => response.json())
    .then((json) => { 
      loadPaymentGatewayPage();
      console.log(json);

  });  
  }
  const settingsPageMarkup = (
    <Page title="Payment Gateway Settings">
       
      <Layout>
        {skipToContentTarget}
        <Layout.AnnotatedSection
          title="Account details"
          description="Jaded Pixel will use this as your account information."
        >
            

            {Object.entries(paymentGateways).map(([key, value]) => (
          
                Object.entries(value).map(([key, value]) => (
                   
                <Card key={value.id} sectioned title={value.title} actions={[{content: 'Delete',onAction: () => {handlePaymentMethodDelete(value.id)}  }]}>
                <Stack>
                    <Stack.Item fill>
                        <p>Ratio</p>
                    </Stack.Item>
                    <Stack.Item>
                        <Badge>{value.ratio}</Badge>
                    </Stack.Item>
                    </Stack>
              </Card>
                    ))
                    
                    
            ))} 

            <Card title="Add New Payment Method">
            <Card.Section>
                <Stack spacing="loose" vertical>
                <p>
                    You can add a new payment method here
                </p>
                <Stack distribution="trailing">
                    <ButtonGroup>
                    <Button onClick={toggleModalActive}>Add Payment Gateway</Button>
                    </ButtonGroup>
                </Stack>
                </Stack>
            </Card.Section>
            </Card>


                
        </Layout.AnnotatedSection>
        
      </Layout>
      <Layout>
      </Layout>
    </Page>
  );

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

  //const pageMarkup = homePage;

  const modalMarkup = (
    <Modal
      open={modalActive}
      onClose={toggleModalActive}
      title="Add Payment Gateway"
      primaryAction={{
        content: 'Add Gateway',
        onAction: addPaymentGateway,
        loading:isAddingPaymentGateway,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Title"
            value={newPaymentGatewayTitle}
            onChange={handleNewTitleChange}
            autoComplete="off"
          />
          <TextField
            label="Ratio"
            value={newPaymentGatewayRatio}
            onChange={handleNewRatioChange}
            autoComplete="off"
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );


  const theme = {
    logo: {
      height: 36,
      topBarSource:
        '/images/logoipsum-logo-5.svg',
      contextualSaveBarSource:
        '/images/logoipsum-logo-5.svg',
      url: 'merrycode.com',
      accessibilityLabel: 'Order Simulation',
    },
  };

  return (
    <div style={{height: '500px'}}>
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: 'Avatar',
              labelWithInitials: 'Avatar with initials {initials}',
            },
            ContextualSaveBar: {
              save: 'Save',
              discard: 'Discard',
            },
            TextField: {
              characterCount: '{count} characters',
            },
            TopBar: {
              toggleMenuLabel: 'Toggle menu',

              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
            Modal: {
              iFrameTitle: 'body markup',
            },
            Frame: {
              skipToContent: 'Skip to content',
              navigationLabel: 'Navigation',
              Navigation: {
                closeMobileNavigationLabel: 'Close navigation',
              },
            },
          },
        }}
      >
        <Frame
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
          skipToContentTarget={skipToContentRef.current}
        >
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {(currentPage == 'actual') ? actualPageMarkup : null}
          {(currentPage == 'settings') ? settingsPageMarkup : null }
          {toastMarkup}
          {modalMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}

export default Home;

// DOM element
if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}