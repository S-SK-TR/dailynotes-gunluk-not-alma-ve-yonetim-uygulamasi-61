import { useJournal } from '../context'
import { EntryCard } from './entry-card'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export function EntryList() {
  const { entries } = useJournal()

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No journal entries yet. Start writing your first entry!</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {entries.map((entry) => (
        <motion.div key={entry.id} variants={itemVariants}>
          <EntryCard entry={entry} />
        </motion.div>
      ))}
    </motion.div>
  )
}