import PageLayout from '@/components/layout/PageLayout'
import ChatUI from './ChatUI'

function CommuncationPage() {
    return (
        <PageLayout hideFooter={true}>
            <ChatUI />
        </PageLayout>
    )
}

export default CommuncationPage