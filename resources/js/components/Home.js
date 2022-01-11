import React, {useCallback, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
//import {AppProvider, Avatar, ResourceList, TextStyle, Navigation,  Page, Card, Button} from '@shopify/polaris';
import {AppProvider, ActionList, Avatar, Card, ContextualSaveBar, FormLayout, Frame, Layout, Loading, Modal, Navigation, Page, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer, TextField, Toast, TopBar} from '@shopify/polaris';
import {ArrowLeftMinor, ConversationMinor, HomeMajor, OrdersMajor} from '@shopify/polaris-icons';
  

function Home() {
    const defaultState = useRef({
        emailFieldValue: 'dharma@jadedpixel.com',
        nameFieldValue: 'Allie Cupcakery',
      });
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
                label: 'Order',
                icon: HomeMajor,
                onClick: toggleIsLoading,
              },
              {
                label: 'Payment Gateway',
                icon: OrdersMajor,
                onClick: toggleIsLoading,
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
    
      const actualPageMarkup = (
        <Page title="Account">
          <Layout>
            {skipToContentTarget}
            <Layout.AnnotatedSection
              title="Account details"
              description="Jaded Pixel will use this as your account information."
            >
              <Card sectioned>
                <FormLayout>
                  <TextField
                    label="Full name"
                    value={nameFieldValue}
                    onChange={handleNameFieldChange}
                    autoComplete="name"
                  />
                  <TextField
                    type="email"
                    label="Email"
                    value={emailFieldValue}
                    onChange={handleEmailFieldChange}
                    autoComplete="email"
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
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
    
      const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;
    
      const modalMarkup = (
        <Modal
          open={modalActive}
          onClose={toggleModalActive}
          title="Contact support"
          primaryAction={{
            content: 'Send',
            onAction: toggleModalActive,
          }}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                label="Subject"
                value={supportSubject}
                onChange={handleSubjectChange}
                autoComplete="off"
              />
              <TextField
                label="Message"
                value={supportMessage}
                onChange={handleMessageChange}
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
            {pageMarkup}
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