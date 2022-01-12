import React, {useCallback, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/build/esm/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
//import {AppProvider, Avatar, ResourceList, TextStyle, Navigation,  Page, Card, Button} from '@shopify/polaris';
import {AppProvider, ButtonGroup, Button, Badge, Stack, ActionList, Avatar, Card, ContextualSaveBar, FormLayout, Frame, Layout, Loading, Modal, Navigation, Page, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer, TextField, Toast, TopBar} from '@shopify/polaris';
import {ArrowLeftMinor, ConversationMinor, HomeMajor, OrdersMajor} from '@shopify/polaris-icons';
  

function Home() {
    const defaultState = useRef({
        emailFieldValue: 'dharma@jadedpixel.com',
        nameFieldValue: 'Allie Cupcakery',
      });

      const [fakeCustomerName, setFakeCustomerName] = useState(); 
      const [fakeLineItems, setFakeLineItems] = useState(); 
      const [fakeCurrency, setFakeCurrency] = useState(); 
      const [fakeShippingAddress, setFakeShippingAddress] = useState(); 
      const [fakeShippingCity, setFakeShippingCity] = useState(); 
      const [fakeCountry, setFakeCountry] = useState(); 
      const [fakePhone, setFakePhone] = useState(); 
      const [fakeStatus, setFakeStatus] = useState(); 
      const [fakeTotal, setFakeTotal] = useState(); 

      const skipToContentRef = useRef(null);
      const [paymentGateways, setPaymentGateways ] = useState({});
      const [addGatewayButtonLayout, setAddGatewayButtonLayout ] = useState(false);
      const [toastActive, setToastActive] = useState(false);
      const [currentPageMarkup, setCurrentPageMarkup] = useState(orderPageMarkup);
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
    
      const handleSubjectChange = useCallback(
        (value) => setSupportSubject(value),
        [],
      );
      const handleMessageChange = useCallback(
        (value) => setSupportMessage(value),
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
                       
                    <Card key={value.id} sectioned title={value.title} actions={[{content: 'Edit'}]}>
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

      const orderPageMarkup = (
        <Page title="Orders">
          <Layout>
            {skipToContentTarget}
            <Layout.AnnotatedSection
              title="Fake Order Generator"
              description="Jaded Pixel will use this as your account information."
            >
              <Card sectioned>
                <FormLayout>
                  <TextField
                    label="Customer Name"
                    value={fakeCustomerName}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    label="Line Items"
                    value={fakeLineItems}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    label="Currency"
                    value={fakeCurrency}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    label="Shipping Address"
                    value={nameFieldValue}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    label="Shipping City"
                    value={fakeShippingCity}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    label="Shipping Country"
                    value={fakeCountry}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    label="Shipping Phone"
                    value={fakePhone}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    label="Status"
                    value={fakeStatus}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    label="Total"
                    value={fakeTotal}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                </FormLayout>
              </Card>
              
            </Layout.AnnotatedSection>
          </Layout>
        </Page>
      );

    //   const loadOrderPage = async (id) => {
        
    //     setIsLoading(true);
    //     console.log("Loading Order Page");
    //     setIsLoading(false);
    //     setCurrentPageMarkup(orderPageMarkup);
    // //     const response = await fetch("https://merrycode.com/node/bohra-calender-client/deactivate-event",
    // //     {
    // //         method: 'POST',
    // //         headers: {
    // //           'Content-Type': 'application/json'
    // //         },
    // //         body: JSON.stringify({
    // //             "event_id": id
    // //           })
    // //       }
        
    // //     ).then((response) => response.json())
    // //     .then((json) => {
           
    // //         //setEvents([...events, json]);
    // //         console.log("event deactivated");
    // //         getEventsWithFetch();
    
    // //   })      
    //   }; 

      const loadOrderPage = async (id) => {
        
        setIsLoading(true);
        setCurrentPageMarkup(loadingPageMarkup);
        console.log("Loading Order page");
        
        const response = await fetch("http://localhost/api/fake-order",
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
            console.log(json.customer_name);
            setFakeCustomerName(json.customer_name);
            setFakeLineItems(json.line_items);
            setFakeCurrency(json.currency);
            setFakeShippingAddress(json.shipping_address);
            setFakeShippingCity(json.shipping_city);
            setFakeCountry(json.shipping_country);
            setFakePhone(json.shipping_phone);
            setFakeStatus(json.status);
            setFakeTotal("100");

            setPaymentGateways(json);
            setIsLoading(false);
            setCurrentPageMarkup(orderPageMarkup);
            //getEventsWithFetch();
    
      })      
      };  

      const loadPaymentGatewayPage = async (id) => {
        
        setIsLoading(true);
        setCurrentPageMarkup(loadingPageMarkup);
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
        setCurrentPageMarkup(settingsPageMarkup);
            //getEventsWithFetch();
    
      })      
      };  
    
      const toastMarkup = toastActive ? (
        <Toast onDismiss={toggleToastActive} content="Changes saved" />
      ) : null;
    
      const userMenuActions = [
        {
          items: [{content: 'Community forums'}],
        },
      ];
    
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
          avatar="/images/profile1.png"
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
            
            title="Simulator"
            items={[
              {
                label: 'Simulate Order',
                icon: HomeMajor,
                onClick: loadOrderPage,
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
    
      //var pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;
    
      const modalMarkup = (
        <Modal
          open={modalActive}
          onClose={toggleModalActive}
          title="Add Payment Gateway"
        >
          <Modal.Section>
            <FormLayout>
              <TextField
              label="Payment Gateway Title"
              value={supportMessage}
              onChange={handleMessageChange}
              autoComplete="off"
              type="text"
              />
              <TextField
                 label="Ratio"
                 value={supportMessage}
                 onChange={handleMessageChange}
                 autoComplete="off"
                 type="text"
              />
              <Button primary loading={addGatewayButtonLayout}>Add Gateway</Button>
            </FormLayout>
          </Modal.Section>
        </Modal>
      );
    
    
      const theme = {
        logo: {
          height: 36,
          topBarSource:
            '/images/vimble_logo.png',
          contextualSaveBarSource:
            '/images/vimble_logo.png',
          url: 'vimble.com',
          accessibilityLabel: 'Vimble',
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
            {currentPageMarkup}
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