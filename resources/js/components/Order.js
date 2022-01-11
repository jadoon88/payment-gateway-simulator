        
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